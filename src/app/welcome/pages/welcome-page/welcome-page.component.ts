import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/user-login/service/auth.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  isLoggedin = false;
  authToken = '';

  constructor(private router: Router, private auth: AuthService) {
    this.isLoggedin = this.auth.isUserLoggedIn();
    this.authToken = this.auth.getToken();
  }

  ngOnInit() {
    // console.log(`IsloggedIn = ${this.isLoggedin}`)
    // console.log(`authToken = ${this.authToken}`)
   if (this.authToken) this.router.navigateByUrl('/boards');
  }
}
