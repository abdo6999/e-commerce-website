import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as intlTelInput from 'intl-tel-input';
import { Profile } from 'src/app/models/profile';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit {
  userForm!:FormGroup
  isValidPhone:boolean = true
  constructor(
    public dialogRef: MatDialogRef<ProfileDialogComponent>,
    private profile:ProfileService,
    @Inject(MAT_DIALOG_DATA) public user: any,
  ) {}
  ngOnInit(): void {
    this.userForm = new FormGroup({
      first_name: new FormControl(this.user.first_name,[Validators.required, Validators.pattern('^[a-zA-Z]*$')]),
      last_name: new FormControl(this.user.last_name,[Validators.required, Validators.pattern('^[a-zA-Z]*$')]),
      email: new FormControl(this.user.email,[Validators.required,Validators.email]),
      phone: new FormControl(this.user.phone),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateInfo(){
    console.log(this.userForm.value)
    this.profile.updateProfile(this.userForm.value).subscribe({
      next:()=>  {
      },
      error:(err)=>  console.error(err),
      complete:()=>  null,
    })
  }
  handleValidationStatus(isValid: boolean) {
    this.isValidPhone = isValid
  }


  get firstnameControl(): FormControl {
    return this.userForm.get('first_name') as FormControl;
  }

  get lastnameControl(): FormControl {
    return this.userForm.get('last_name') as FormControl;
  }

  get emailControl(): FormControl {
    return this.userForm.get('email') as FormControl;
  }


  get phoneControl(): FormControl {
    return this.userForm.get('phone') as FormControl;
  }





}
