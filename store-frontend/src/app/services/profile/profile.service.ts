import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/env/environment.prod';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/profile';
import { Response } from 'src/app/models/auth';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }

  getProfileData():Observable<Response<Profile>> {
    return this.http.get<Response<Profile>>(environment.PROFILE_ROUTE,{withCredentials:true})
  }
  updateProfile(updatedProfileData:Partial<Profile>):Observable<Response<Profile>> {
    return this.http.put<Response<Profile>>(environment.PROFILE_ROUTE,updatedProfileData,{withCredentials:true})
  }
}
