import { Component, Input, OnInit } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  combinedData$: Observable<any>;
  @Input() mobile:boolean = false
  constructor(private auth:AuthService,private alert:AlertService,private storage:LocalStorageService){
    this.combinedData$ = combineLatest([
      this.storage.getFirstName(),
      this.storage.getProfileImage(),
      this.auth.getIsLogin()
    ]).pipe(
      map(([first_name, profile_image, isLogin]) => ({
        first_name,
        profile_image,
        isLogin
      }))
    );
  }

  logout(){
    this.auth.logout().subscribe({
      next: (res) => {
        this.auth.setIsLogin(false);
      },
      error: (error) => {
        this.alert.error(error)
      }
    })
  }
}
