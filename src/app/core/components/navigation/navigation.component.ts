import { Component, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/user-login/service/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnChanges {
  isLoggedin = false;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedin = JSON.parse(localStorage.getItem('is_loggedin')!) || false;
  }

  ngOnChanges() {
    this.isLoggedin = JSON.parse(localStorage.getItem('is_loggedin')!) || false;
  }

  logOut() {
    this.authService.logOut();
    localStorage.setItem('is_loggedin', 'false');
    this.router.navigateByUrl('home');
  }
}
