import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/user/service/auth.service';
import { Iuser } from 'src/app/shared/models/user.model';

import { loginUser } from '../../store/users/users.actions';

import { UsersStateInterface } from '../../store/users/users.reducer';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login-page.component.html',
  styleUrls: ['./user-login-page.component.scss'],
})
export class UserLoginPageComponent implements OnChanges, OnInit {
  loginForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  passwordVisible = false;
  error = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<UsersStateInterface>
  ) {}

  ngOnInit(): void {
    // this.store.dispatch(UsersActions.loadUsers());
    // this.store
    //   .select(fromUsers.getUsersState)
    //   .subscribe((res) => console.log(res));
    // console.log(this.route.snapshot.data);
  }

  ngOnChanges(): void {}

  onLogIn() {
    this.authService.logIn(this.loginForm.value).subscribe(
      (res) => {
        localStorage.setItem('auth_token', res.token);
        this.store.dispatch(
          loginUser({
            login: {
              login: this.loginForm.value.login! || '',
              password: this.loginForm.value.password! || '',
            },
          })
        );
        // console.log(this.authService.isUserLoggedIn());
        localStorage.setItem('user_login', this.loginForm.value.login!);
        localStorage.setItem('is_loggedin', 'true');
        // this.getUserId();
        // this.router.navigateByUrl('/boards');
      },
      () => {
        localStorage.setItem('is_loggedin', 'false');
        this.error = true;
      },
      () => {
        localStorage.setItem('is_loggedin', 'true');
        this.getUserId();
        this.router.navigateByUrl('/boards');
      }
    );
  }

  getUserId(): string | void {
    let loggedUser: Iuser | undefined;
    const userLogin = localStorage.getItem('user_login');
    this.authService.getUsers().subscribe((res) => {
      loggedUser = res.find((user) => user.login === userLogin);
      localStorage.setItem('user_id', loggedUser?._id || '');
      console.log(loggedUser);
    }),
      (e: Error) => console.log(e);

    return loggedUser?._id;
  }
}
