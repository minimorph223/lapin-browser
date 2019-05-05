import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class FeatureService {
  private githubUrl = 'https://api.github.com/repos/minimorph223/lapin-browser'; // github api url

  constructor(
  	private http: HttpClient) { }


  /** GET content from github api **/
  loadStoryMap(): Observable<any>{
  	return this.getGitSha('features')
  		.pipe(switchMap((sha) => this.getGitTree(sha, true)))
  		.pipe(
  			map((tree) => {	
  				const stories = tree.filter( x => {
  					return x.type === 'blob' && x.path.includes('.feature');
  				});
  				const storyMap: any = {
            "name": "root",
            "total": 0,
            "stories": [],
            "groups": [],
            "coverage": "calculating",
          };

	  			stories.forEach((x) => {
	  				const paths = x.path.split('/');
            let childMap = storyMap;
	  				paths.forEach((path) => {
	  					if (path.includes('.feature')) {
	  						// story file
                childMap.stories.push(path);
              } else {
                const existedGroup = childMap.groups.filter((x)=>{
                  return x.name === path;
                });
                if (existedGroup.length>0) {
                  childMap = existedGroup[0];
                } else {
                  const tempMap: any = {
                    "name": path,
                    "total": 0,
                    "stories": [],
                    "groups": [],
                    "coverage": "calculating",              
                  };
                  childMap.groups.push(tempMap);
                  childMap = tempMap;               
                }
              }     
	  				});
	  			});
	  			return storyMap; 				
  			})
  		)
  		// .subscribe();
  }

  summarizeStoryMap(storyMap: any): Observable<any>{
    if (storyMap.stories) {
      let total = storyMap.stories.length;
      storyMap.groups.forEach((childMap) => {
        console.log("BEFORE");
        console.log("childMap:" + childMap.name + ":" + childMap.total);
        this.summarizeStoryMap(childMap);
        console.log("AFTER");
        console.log("childMap:" + childMap.name + ":" + childMap.total);
        total = total + childMap.total;
      });
      storyMap.total = total;
    }
    return storyMap;
  }


  private getGitSha(filepath: string): Observable<string> {
  	const regex = /(.*\/)(.*)/;
  	const match = regex.exec(filepath);
  	let parent = '/';
  	let filename = filepath;
  	if (match) {
  		parent = match[1];
  		filename = match[2];
  	}
  	return this.http.get<Array<any>>(this.githubUrl + '/contents/' + parent)
  		.pipe(
  			map((contents) => {
  				const found = contents.filter((x)=>{
  					return x.name === filename;
  				});
  				if (found[0]) {
  					return found[0].sha;
  				}
  				return undefined;
  			})
  		)
  }

  private getGitTree(sha: string, recursive: boolean): Observable<Array<any>> {
  	let treeUrl = this.githubUrl + '/git/trees/' + sha;
  	if (recursive) {
  		treeUrl = treeUrl + '?recursive=1';
  	}
  	return this.http.get<any>(treeUrl)
  		.pipe(
  			map((result) => {
  				return result.tree;
  			})
  		);
  }

  private handleError(error) {
  	console.log(error);
  }

}