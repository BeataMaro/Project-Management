import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { AuthService } from 'src/app/user-login/service/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService, private ref: ChangeDetectorRef) {
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.ref.reattach();
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isUserLoggedIn();
  }

  logOut() {
    this.authService.logOut();
    this.ngOnInit();
  }
}
