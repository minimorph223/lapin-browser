import { Component, OnInit } from '@angular/core';
import { FeatureService } from '../feature.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  constructor(private featureService: FeatureService) { }

  ngOnInit() {
    this.featureService.test();
  }
}