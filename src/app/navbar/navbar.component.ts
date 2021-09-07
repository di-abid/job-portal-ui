import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAdmin:boolean = true;
  isUserLoggedIn?:boolean;
  isLoggedIn: Observable<boolean>;

  constructor(private router: Router,
    private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn;
   }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe( data =>{
      this.isUserLoggedIn = data;
    });
  }

  logout() {
    localStorage.clear();
    this.isUserLoggedIn = false;
    this.authService.logout();
  }
}
