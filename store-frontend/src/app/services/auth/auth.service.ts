import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, filter, map, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/env/environment.prod';
import { User } from 'src/app/models/user';
import { AuthCredentialsDot,accessToken } from 'src/app/models/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  // registerUser service
  registerUser(userData: User): Observable<void> {
    return this.http.post<void>(environment.REGISTER_ROUTE, userData)
  }

  // login service
  login(authCredentialsDot: AuthCredentialsDot) {
    const body = {
      userName: authCredentialsDot.userName,
      password: authCredentialsDot.password,
    };
    return this.http.post(environment.LOGIN_ROUTE, body);
  }

  logout(): Observable<null> {
    localStorage.removeItem('token');
    return of(null);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }
}

