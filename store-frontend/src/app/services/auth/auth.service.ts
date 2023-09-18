import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, interval, map, of, switchMap, throwError} from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/env/environment.prod';
import { User } from 'src/app/models/user';
import { AuthCredentialsDot,Response,accessToken } from 'src/app/models/auth';
import { Profile } from 'src/app/models/profile';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
type ValidationErrors = {
  [key: string]: any;
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin!:boolean
  isLoginSubject: BehaviorSubject<boolean>
  constructor(private http: HttpClient) {
    this.isLoginSubject = new BehaviorSubject<boolean>(this.isLogin);
  }

  registerUser(userData: User): Observable<void> {
    return this.http.post<void>(environment.REGISTER_ROUTE, userData)
  }

  login(authCredentialsDot: AuthCredentialsDot):Observable<Profile> {
    return this.http.post<Response<Profile>>(environment.LOGIN_ROUTE, {authCredentialsDot},{withCredentials:true})    .pipe(
      map(response => response.data)
    );;
  }

  logout() {
    return this.http.get(environment.LOGOUT_ROUT,{withCredentials:true});
  }
  generateToken(): Observable<void> {
    return this.http.get<void>(environment.ACCUSES_TOKEN_ROUTE,{withCredentials:true})
  }

  checkIfEmailExists(username:string):Observable<boolean>{
    return this.http.get<Response<boolean>>(`${environment.USERNAME_EXISTS + username}`,{withCredentials:true})    .pipe(
      map(response => response.data)
    );
  }

  emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkIfEmailExists(control.value).pipe(
        map((res) => {
          return res ? { emailExists: true } : null;
        }),
        catchError(async () => null)
      );
    };
  }

  // get is Login if authenticated true setIsLogin to true if authenticated false and if there are token (token:null) then try generate token
  isLoggedIn():Observable<{ authenticated: boolean,token?:null }| null | void>  {
    return this.http.get<{ authenticated: boolean,token?:null }>(environment.IS_LOGGED_IN_ROUT,{withCredentials:true})
    .pipe(
      switchMap((res) => {
        this.setIsLogin(res.authenticated);
        if (!res.authenticated && !res.token) {
          return this.generateToken().pipe(
            map(() => {
              this.setIsLogin(true);
            }),
            catchError((error) => {
              this.setIsLogin(false);
              return Promise.resolve()
            })
          );
        }
        return Promise.resolve();
      }),
      catchError((error) => {
        return Promise.resolve()
      })
    )
  }





  getIsLogin():Observable<boolean> {
    return this.isLoginSubject.asObservable()
  }

  setIsLogin(value: boolean) {
    this.isLogin = value;
    this.isLoginSubject.next(value);
  }



}

