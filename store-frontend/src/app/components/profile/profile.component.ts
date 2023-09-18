import { Component, OnInit } from '@angular/core';
import{faVenusMars} from "@fortawesome/free-solid-svg-icons"
import {MatDialog,  } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { ProfileDialogComponent } from 'src/app/shared/child-components/profile/profile-dialog/profile-dialog.component';
import { AddressDialogComponent } from 'src/app/shared/child-components/profile/address-dialog/address-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  faVenusMars = faVenusMars

  user!:Profile

    information!:Partial<Profile>

    address_info!:Partial<Profile>

  constructor(public dialog: MatDialog,private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const profileData = data["profileData"];
      this.user = profileData.data
      this.information = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        gender: this.user.gender,
        age: this.user.age,
        date_of_birth: this.user.date_of_birth,
        profile_image: this.user.profile_image,
        phone: this.user.phone,
      };
      this.address_info = {
        country: this.user.country,
        city: this.user.city,
        address: this.user.address,
        post_code: this.user.post_code,
      };
    });
  }

  editProfile(event:Event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      data: this.information,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        Object.assign(this.information, result);
      }
    });
  }
  editAddress(event:Event){
    event.stopPropagation();
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      data: this.address_info,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        Object.assign(this.address_info, result);
      }
    });
  }
}
