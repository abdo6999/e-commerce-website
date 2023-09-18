import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { Profile } from '../models/profile';
import { Response } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver  {
  constructor(private profileService: ProfileService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Response<Profile>> {
    return this.profileService.getProfileData();
  }
}
