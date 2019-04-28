import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, filter, first } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class FeatureService {
  private githubUrl = 'https://api.github.com/repos/minimorph223/lapin-browser'; // github api url

  constructor(
  	private http: HttpClient) { }


  /** GET content from github api **/
  test (): void{
  	this.getGitSha('README.md')
  		.subscribe( sha => this.getGitTree(sha).subscribe( x => console.log(x) ));

  }



  private getGitSha(filepath: String): Observable<String> {
  	const regex = /(.*\/)(.*)/;
  	const match = regex.exec(filepath);
  	let parent = '/';
  	let filename = filepath;
  	if (match) {
  		parent = match[1];
  		filename = match[2];
  	}
  	return this.http.get(this.githubUrl + '/contents/' + parent)
  		.pipe(
  			map((contents) => {
  				const found = contents.filter((x)=>{
  					return x.name === filename;
  				});
  				if (found) {
  					return found[0].sha;
  				}
  				return undefined;
  			})
  		)
  }

  private getGitTree(sha: String, recursive: Boolean): Observable<Object> {
  	return this.http.get(this.githubUrl + '/git/trees/' + sha);
  }

  private handleError(error) {
  	console.log(error);
  }

}