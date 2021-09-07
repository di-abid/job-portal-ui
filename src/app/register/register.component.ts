import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../toast/toast.service';
import { User } from '../model/user-model';
import { RegisterService } from '../service/register.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user : User = new User();
  submitted = false;
  resume?: File | null;
  isLoggedIn?: Observable<boolean>;

  constructor(
    private toastService: ToastService,
    private registerService: RegisterService,
    private router: Router,
    private authService: AuthService
  ) {
    this.submitted = false;
  }

  ngOnInit(): void {
  }

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    expertise: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    resume: new FormControl('', [Validators.required])
  });


  registerUser(saveUser:any) {
    if (this.resume === undefined) {
      this.showError('Please upload resume');
      return;
    }
    this.user = new User();
    this.user.name = this.UserName?.value;
    this.user.email = this.UserEmail?.value;
    this.user.expertise = this.UserExpertise?.value;
    this.user.password = this.UserPassword?.value;
    this.user.isRegistered = true;
    this.user.isAdmin = false;
    this.registerService.registerUser(this.user, this.resume).subscribe(
      resp=> {
        this.showSuccess('User registerd successfully');
        this.registerForm.reset();
        this.router.navigate(['login'])
      },
      error=>{
        let errorCode =  error.error.errorCode;
        let message = error.error.message;
        this.showError(message);
      }
    )
  }

  selectFile(event: any) {
    this.resume = event.target.files[0];
  }

  get UserName() {
    return this.registerForm.get('name');
  }

  get UserExpertise() {
    return this.registerForm.get('expertise');
  }

  get UserEmail() {
    return this.registerForm.get('email');
  }

  get UserPassword() {
    return this.registerForm.get('password');
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

  setUserDataInLocalStorage(userData: any) {
    localStorage.setItem('userInfo', JSON.stringify(userData));
  }
}


