import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector, private router: Router, private authService:AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if ([401, 403].indexOf(err.status)) {
          this.authService.logout();
        } else if (err.status === 404) {
          this.router.navigate(['/notFoundResource', err.status], {
            queryParams: {
              'Error-Status': err.status,
            },
          });
        } else {
          this.router.navigate(['/applicationError', err.status], {
            queryParams: {
              'Error-Status': err.status,
            },
          });
        }
        const error = err.message || err.statusText;
        return throwError(() => new Error(error));
      })
    );
  }
}
