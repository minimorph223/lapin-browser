import { Component, OnInit } from '@angular/core';
import { FeatureService } from '../feature.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  storyMap: any = {};
  constructor(private featureService: FeatureService) {}

  ngOnInit() {
    this.loadMap();
    console.log(this.storyMap);
  }

  loadMap(): void {
    console.log('start');
    this.featureService.loadStoryMap()
      .subscribe((storyMap) => {
        this.featureService.summarizeStoryMap(storyMap);
        this.storyMap = storyMap;
      });

    console.log(this.storyMap);
  }
}