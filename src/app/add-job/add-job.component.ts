import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {
  experienceYearLimit: number = 15;
  experienceMonthLimit: number = 12;
  experienceYearValues: number[] =  [];
  experienceMonthValues: number[] =  [];
  jobCategory:string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.setJobCategory();

    for(var i = 1; i <= this.experienceYearLimit; i++) {
        this.experienceYearValues.push(i);
    }
    for(var i = 0; i <= this.experienceMonthLimit; i++) {
      this.experienceMonthValues.push(i);
    }
  }

  setJobCategory() {
    this.jobCategory.push('All Jobs');
    this.jobCategory.push('Permanent Job');
    this.jobCategory.push('Contract Job');
    this.jobCategory.push('Govt Job');

  }

  submitForm() {
    alert('Search submitted');
  }

}
