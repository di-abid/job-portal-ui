import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:8090';

  constructor(private http:HttpClient) { }

  login(user: any): Observable<object> {
    let userData = new FormData();
    userData.append('email', user?.email);
    userData.append('password', user?.password);
    return this.http.post(`${this.baseUrl}`+'/user/login', user);
  }
}
