import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private jobsearchDataBehaviour = new BehaviorSubject('any');
  currentMessage = this.jobsearchDataBehaviour.asObservable();

  private jobDataBehavior = new BehaviorSubject('any');
  jobData = this.jobDataBehavior.asObservable();

  constructor() { }


  setJobSearchData(jobsearchData: any) {
    this.jobsearchDataBehaviour.next(jobsearchData);
  }

  setJobData(jobData: any) {
    this.jobDataBehavior.next(jobData);
  }
}
