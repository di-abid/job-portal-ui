import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobSearchService {
  private baseUrl = 'http://localhost:8091';

  constructor(private http:HttpClient) { }

  searchJob(searchJob: any): Observable<object> {
    let url = `${this.baseUrl}`+'/job/searchJobs?pageNo=0&pageSize=10&sortBy=id&jobSkills='+ searchJob?.jobSkills + '&jobExpYears=' + searchJob?.jobExpYears +
    '&jobExpMonths=' + searchJob?.jobExpMonths + '&jobCategory=' + searchJob?.jobCategory+ '&jobLocation=' + searchJob?.jobLocation;
    return this.http.get(url);
  }
}
