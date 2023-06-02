import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Ilogin, Isignup, Itoken, Iuser } from '../../shared/models/user.model';
import { Store } from '@ngrx/store';
import { UsersStateInterface } from '../store/users/users.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users: Iuser[] = [];
  token = '';
  isLoggedIn = false;
  loggedUserId = '';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store<UsersStateInterface>
  ) {}

  // CanActivate = (): boolean => this.token ? true : false


  signUp({ name, login, password }: Isignup): Observable<Iuser> {
    return this.httpClient.post<Iuser>('auth/signup', {
      name,
      login,
      password,
    });
  }

  logIn({ login, password }: Ilogin): Observable<Itoken> {
    localStorage.setItem('is_loggedin', 'true');
    return this.httpClient.post<Itoken>('auth/signin', {
      login,
      password,
    });
  }

  getToken() {
    this.token = localStorage.getItem('auth_token') || '';
    return this.token;
  }

  isUserLoggedIn(): boolean {
    // this.store
    //   .select(isLoggedInSelector)
    //   .subscribe((res) => (this.isLoggedIn = res));
    this.isLoggedIn = JSON.parse(localStorage.getItem('is_loggedin')!) || false;
    console.log(this.isLoggedIn); 
    return this.isLoggedIn;
  }

  // getLoggedUser(user_id): Observable<IUser> {
  //  return this.httpClient.get<Iuser>(`users/${user_id}`)
  // }

  getLoggedUserId() {
    this.loggedUserId = localStorage.getItem('user_id') || '';
    return this.loggedUserId;
  }

  getUsers(): Observable<Iuser[]> {
    return this.httpClient.get<Iuser[]>('users');
  }

  getUser(): Observable<Iuser> {
    // const userName = localStorage.getItem('user_name') || '';
    // const userLogin = localStorage.getItem('user_login') || '';
    const userId = localStorage.getItem('user_id') || '';
    return this.httpClient.get<Iuser>(`users/${userId}`);
  }

  deleteUser(userId: string): Observable<Iuser> {
    return this.httpClient.delete<Iuser>(`users/${userId}`);
  }

  updateUser({ name, login, password }: Isignup): Observable<Iuser> {
    const userId = localStorage.getItem('user_id') || '';
    return this.httpClient.put<Iuser>(`users/${userId}`, {
      name,
      login,
      password,
    });
  }

  logOut() {
    localStorage.clear();
    localStorage.setItem('is_loggedin', 'false');
    this.router.navigateByUrl('/home');
  }
}
