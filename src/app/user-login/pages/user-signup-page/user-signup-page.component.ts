import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/user-login/service/auth.service';

@Component({
  selector: 'app-user-signup-page',
  templateUrl: './user-signup-page.component.html',
  styleUrls: ['./user-signup-page.component.scss']
})
export class UserSignupPageComponent {

  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSignUp() {
    this.authService
      .signUp(this.signupForm.value)
      .subscribe((res) => {
        localStorage.setItem('user_name', res.name);
      });
      this.router.navigateByUrl('/login-form');

    // this.getUsers();
  }
  private getUsers() {
    // this.authService.getUsers().subscribe((res) => console.log(res));
    // this.authService.getUsers();
  }
}
