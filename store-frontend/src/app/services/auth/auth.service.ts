import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, filter, map, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/env/environment.prod';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser!: User | null;

  constructor(private http: HttpClient, private router: Router) {}

  // registerUser service
  registerUser(userData: User): Observable<User> {
    return this.http.post<User>(environment.REGISTER_ROUTE, userData).pipe(
      tap((user) => (this.currentUser = user)),
      catchError((error) => {
        console.error('Error during registration:', error);
        return of(null);
      }),
      filter((user) => !!user), // filter out null values
      map((user) => user as User) // cast to User type
    );
  }

  // login service
  login(email: string, password: string): Observable<User> {
    const body = { email, password };
    return this.http.post<User>(environment.LOGIN_ROUTE, body).pipe(
      tap((user) => (this.currentUser = user)),
      catchError((error) => {
        console.error('Error during login:', error);
        return of(null);
      }),
      filter((user) => !!user), // filter out null values
      map((user) => user as User) // cast to User type
    );
  }

  logout(): Observable<null> {
    this.currentUser = null;
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
    return of(null);
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }
}

