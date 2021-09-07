import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseUrl = 'http://localhost:8090';

  constructor(private http:HttpClient) { }

  registerUser(user: any, resume:any): Observable<object> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'multipart/form-data');
    let file = new FormData();
    file.append('name', user?.name);
    file.append('email', user?.email);
    file.append('expertise', user?.expertise);
    file.append('resume',resume);
    file.append('isRegistered',user?.isRegistered);
    file.append('password', user?.password);
    file.append('isAdmin', user?.isAdmin);
    return this.http.post(`${this.baseUrl}`+'/user/register', file);
  }
}
