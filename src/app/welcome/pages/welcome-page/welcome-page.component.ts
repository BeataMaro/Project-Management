import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  isLoggedin = false;

  constructor(private router: Router) {
    this.isLoggedin = JSON.parse(localStorage.getItem('is_loggedin')!);
  }

  ngOnInit() {
    console.log(this.isLoggedin)
   if (this.isLoggedin) this.router.navigateByUrl('/boards');
  }
}
