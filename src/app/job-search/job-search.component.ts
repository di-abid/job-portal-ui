import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JobSearch } from '../model/job-search-model';
import { DataService } from '../service/data.service';
import { JobSearchService } from '../service/job-search.service';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.css']
})
export class JobSearchComponent implements OnInit {
  experienceYearLimit: number = 15;
  experienceMonthLimit: number = 12;
  experienceYearValues: number[] =  [];
  experienceMonthValues: number[] =  [];
  jobCategory:string[] = [];
  jobSearch: JobSearch = new JobSearch;
  jobSearchData:any;

  jobSubscription: Subscription = new Subscription;

  constructor(
    private router: Router,
    private toastService: ToastService,
    private jobSearchService: JobSearchService,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.jobSubscription = this.dataService.currentMessage.subscribe();
    this.setJobCategory();

    for(var i = 1; i <= this.experienceYearLimit; i++) {
        this.experienceYearValues.push(i);
    }
    for(var i = 0; i <= this.experienceMonthLimit; i++) {
      this.experienceMonthValues.push(i);
    }
  }

  jobSearchForm = new FormGroup({
    keySkills: new FormControl('', [Validators.required]),
    jobCategory: new FormControl('', [Validators.required]),
    jobLocation: new FormControl('', [Validators.required]),
    jobExpYears: new FormControl('', [Validators.required]),
    jobExpMonths: new FormControl('', [Validators.required])
  });

  searchJob(searchJob:any) {
    let skills:string = this.JobSkills?.value;
    this.jobSearch.jobSkills = skills.trim();
    this.jobSearch.jobCategory = this.JobCategory?.value;
    this.jobSearch.jobLocation = this.JobLocation?.value;
    this.jobSearch.jobExpYears = this.JobExpYears?.value;
    this.jobSearch.jobExpMonths = this.JobExpMonths?.value;

    this.jobSearchService.searchJob(this.jobSearch).subscribe(
      resp=> {
        this.jobSearchData = resp;
        if (this.jobSearchData.data.length !== 0) {
          this.dataService.setJobSearchData(this.jobSearchData);
          this.router.navigate(['job-list/']);
        }
      },
      error=>{
        let errorCode =  error.error.errorCode;
        let message = error.error.message;
        this.showError(message);
      }
    )
  }

  get JobSkills(){
    return this.jobSearchForm.get('keySkills');
  }

  get JobLocation(){
    return this.jobSearchForm.get('jobLocation');
  }

  get JobCategory(){
    return this.jobSearchForm.get('jobCategory');
  }

  get JobExpYears(){
    return this.jobSearchForm.get('jobExpYears');
  }

  get JobExpMonths(){
    return this.jobSearchForm.get('jobExpMonths');
  }


  submitForm() {
    alert('Search submitted');
  }

  setJobCategory() {
    this.jobCategory.push('All Jobs');
    this.jobCategory.push('Permanent');
    this.jobCategory.push('Contract');
    this.jobCategory.push('Govt');
  }

  showSuccess(message:any) {
    this.toastService.show(message, {
      classname: 'bg-success text-light',
      delay: 1000,
      autohide: true,
      headertext: 'Success'
    });
  }

  showError(message:any) {
    this.toastService.show(message, {
      classname: 'bg-danger text-light',
      delay: 1000,
      autohide: false,
      headertext: 'Error!!!'
    });
  }
}


