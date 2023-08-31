
import {  Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,  Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard   {
  constructor(private authService:AuthService,private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {
      if (this.authService.isLoggedIn() && this.authService.getCurrentUser()){
        return true;
      }else {
        this.router.navigate(['auth/login'],{
          queryParams:{returnUrl:state.url}
        })
      }
      return false
  }

}
