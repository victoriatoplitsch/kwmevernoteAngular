import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../shared/authentication.service";
import {User} from "../shared/user";

interface Response {
  access_token:string;
}
@Component({
  selector: 'ke-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent{
  loginForm:FormGroup;
  user: any;
  constructor(
    private fb:FormBuilder,
    private router:Router,
    private authService: AuthenticationService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }


  login() {
    const val = this.loginForm.value;
    this.authService.login(val.username, val.password).subscribe((res:any)=>{
      this.authService.setSessionStorage((res as Response).access_token);
      this.router.navigateByUrl('/');
    });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }

}
