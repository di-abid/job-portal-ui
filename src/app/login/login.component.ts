import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { LoginService } from '../service/login.service';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private toastService: ToastService,
    private router: Router,
    private authService: AuthService,
    private loginService: LoginService) { }

  ngOnInit(): void {
  }

  routeToRegister() {
    this.router.navigate(['register/']);
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  loginUser() {
    const loginUser = {
      email: this.UserEmail?.value,
      password: this.UserPassword?.value
    };
    this.loginService.login(loginUser).subscribe(resp => {
      this.setUserDataInLocalStorage(resp);
      this.authService.login(JSON.stringify(resp));
    },
    error => {
      let errorCode =  error.error.errorCode;
      let message = error.error.message;
      this.showError(message);
    })
  }

  get UserEmail() {
    return this.loginForm.get('email');
  }

  get UserPassword() {
    return this.loginForm.get('password');
  }

  setUserDataInLocalStorage(userData: any) {
    localStorage.setItem('userInfo', JSON.stringify(userData));
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
