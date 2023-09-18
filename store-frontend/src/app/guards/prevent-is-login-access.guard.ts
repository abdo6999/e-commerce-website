import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PreventIsLoginAccessGuard  {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if(this.authService.isLogin){
      this.router.navigate(['/home']);
      return false;
    }else {
      return true;
    }
  }
}
