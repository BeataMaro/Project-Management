import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/user-login/service/auth.service';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';
import { isLoggedInSelector } from 'src/app/user-login/store/users/users-selectors';
import {
  windowInnerWidth,
  handleSize,
} from 'src/app/shared/helpers/window-size';
import { logoutUser } from 'src/app/user-login/store/users/users-actions';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  title = 'detect-route-change';
  currentRoute: string;
  isLoggedIn = this.store.select(isLoggedInSelector);
  // isLoggedIn = JSON.parse(localStorage.getItem('is_loggedin')!);
  showHamburger = true;
  myBreakpoint = 1;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {
    this.currentRoute = '';
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        console.log('Route change detected');
      }

      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        this.ngOnInit();
        console.log(event);
      }

      if (event instanceof NavigationError) {
        console.log(event.error);
      }
    });
  }

  ngOnInit() {
    this.myBreakpoint = windowInnerWidth();

    // this.store.select(isLoggedInSelector).subscribe((res) => console.log(`res: ${res}`));
    // console.log(this.isLoggedIn);
    this.isLoggedIn = JSON.parse(localStorage.getItem('is_loggedin')!);
  }

  handleSize(event: Event) {
    this.myBreakpoint = handleSize(event);
  }

  logOut() {
    this.authService.logOut();
    this.store.dispatch(logoutUser());
    this.ngOnInit();
  }
}
