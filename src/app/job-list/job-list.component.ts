import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit, OnDestroy {

  noDataMsg:string = 'No job data. Please use job search';
  dataExists:boolean = false;
  jobData:any;
  jobSearchData:any;

  jobSubscription: Subscription = new Subscription;

  constructor(private router:Router,
      private dataService: DataService) { }

  ngOnInit(): void {
      this.jobSubscription = this.dataService.currentMessage.subscribe( jobSearchData => {
        if (jobSearchData !== 'any') {
          this.dataExists = true;
          this.jobSearchData = jobSearchData;
          this.jobData = this.jobSearchData.data;
        }
      }
    )
  }

  viewJobDetails(jobData: any) {
    this.dataService.setJobData(jobData);
    this.router.navigate(['job-description/']);
  }

  ngOnDestroy() {
    this.jobSubscription.unsubscribe();
  }

}
