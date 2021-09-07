import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.css']
})
export class JobDescriptionComponent implements OnInit, OnDestroy {

  noDataMsg:string = 'No job data. Please use job search';
  dataExists:boolean = false;
  jobData:any;
  jobSubscription: Subscription = new Subscription;
  userData:any;
  userDataJson:any;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.userData = localStorage.getItem('userInfo');

    alert(JSON.parse(this.userData).name);
    this.jobSubscription = this.dataService.jobData.subscribe( jobData => {
        if (jobData !== 'any') {
          this.dataExists = true;
          this.jobData = jobData;
        }
      })
  }

  ngOnDestroy() {
    this.jobSubscription.unsubscribe();
  }

}
