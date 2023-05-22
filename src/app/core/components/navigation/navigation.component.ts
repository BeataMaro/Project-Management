import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
// import { Router } from '@angular/router';
import { AuthService } from 'src/app/user-login/service/auth.service';
import { isLoggedInSelector } from 'src/app/user-login/store/users/users-selectors';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  // isLoggedIn = this.store.select(isLoggedInSelector);
  isLoggedIn = JSON.parse(localStorage.getItem('is_loggedin')!);

  constructor(private authService: AuthService, private store: Store) {
   
  }

  ngOnInit() {
    // this.isLoggedIn = this.store.select(isLoggedInSelector);
    this.isLoggedIn = JSON.parse(localStorage.getItem('is_loggedin')!);
    console.log(`ngOnInit isLoggedIn: ${this.isLoggedIn}`)
  }

  logOut() {
    this.authService.logOut();
    this.ngOnInit();
  }
}
