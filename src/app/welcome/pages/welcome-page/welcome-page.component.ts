import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/user-login/service/auth.service';
import {
  windowInnerWidth,
  handleSize,
} from 'src/app/shared/helpers/window-size';
import { Observable, map } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  isLoggedin = false;
  authToken = '';
  mybreakpoint: number = 1;
  colspan$: Observable<number>;

  constructor(private router: Router, private auth: AuthService, private breakpointObserver: BreakpointObserver) {
    this.isLoggedin = this.auth.isUserLoggedIn();
    this.authToken = this.auth.getToken();
    this.colspan$ = breakpointObserver.observe('(max-width: 599.99px)')
    .pipe(map(state => state.matches ? 1 : 2));
  }

  ngOnInit() {
    this.mybreakpoint = windowInnerWidth();
    // console.log(`IsloggedIn = ${this.isLoggedin}`)
    // console.log(`authToken = ${this.authToken}`)
   if (this.authToken) this.router.navigateByUrl('/boards');
  }

  handleSize(event: any) {
    this.mybreakpoint = handleSize(event);
  }
}
