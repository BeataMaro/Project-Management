import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Ilogin, Isignup, Itoken, Iuser } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // interceptor - just endpoint
  users: Iuser[] = [];
  private token = localStorage.getItem('auth_token');
  isLoggedIn: Boolean = false;
  loggedUserId = '';

  constructor(private httpClient: HttpClient, private router: Router) {}

  signUp({ name, login, password }: Isignup): Observable<Iuser> {
 
    return this.httpClient.post<Iuser>('auth/signup', {
      name,
      login,
      password,
    })
  }

  logIn({ login, password }: Ilogin): Observable<Itoken> {
    return this.httpClient.post<Itoken>('auth/signin', {
      login,
      password,
    });
  }

  getLoggedUserId() {
    this.loggedUserId = localStorage.getItem('user_id') || '';
    return this.loggedUserId;
  }

  getUsers(): Observable<Iuser[]> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.get<Iuser[]>('users', { headers });
  }

  getUser(user: Iuser): Observable<Iuser> {
    return this.httpClient.get<Iuser>(`users/${user._id}`);
  }

  deleteUser(userId: string): Observable<Iuser> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      _id: userId,
    });
    return this.httpClient.delete<Iuser>(`users/${userId}`, {
      headers,
    });
  }

  updateUser({name, login, password}: Isignup): Observable<Iuser> {
    const token = localStorage.getItem('auth_token');
    const userId = localStorage.getItem('user_id') || '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      _id: userId,
    });
    return this.httpClient.put<Iuser>(
      `users/${userId}`,
      {
        name, login, password
      },
      {
        headers,
      }
    );
  }

  logOut() {
    this.router.navigateByUrl('/home');
    localStorage.clear();
  }
}
