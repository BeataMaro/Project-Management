import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
// import { Router } from '@angular/router';
import { AuthService } from 'src/app/user-login/service/auth.service';
import { isLoggedInSelector } from 'src/app/user-login/store/users/users-selectors';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  title = 'detect-route-change';
  currentRoute: string;
  // isLoggedIn = this.store.select(isLoggedInSelector);
  isLoggedIn = JSON.parse(localStorage.getItem('is_loggedin')!);
  showHamburger = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {
    this.currentRoute = '';
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show progress spinner or progress bar
        console.log('Route change detected');
      }

      if (event instanceof NavigationEnd) {
        // Hide progress spinner or progress bar
        this.currentRoute = event.url;
        this.ngOnInit();
        console.log(event);
      }

      if (event instanceof NavigationError) {
        // Hide progress spinner or progress bar

        // Present error to user
        console.log(event.error);
      }
    });
  }

  ngOnInit() {
    // this.isLoggedIn = this.store.select(isLoggedInSelector);
    this.isLoggedIn = JSON.parse(localStorage.getItem('is_loggedin')!);
    console.log(`ngOnInit isLoggedIn: ${this.isLoggedIn}`);
  }

  logOut() {
    this.authService.logOut();
    this.ngOnInit();
  }
}
