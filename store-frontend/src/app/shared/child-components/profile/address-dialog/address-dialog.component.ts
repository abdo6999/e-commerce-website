import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.scss']
})
export class AddressDialogComponent {
  userForm!:FormGroup
  isValidPhone:boolean = true
  constructor(
    public dialogRef: MatDialogRef<AddressDialogComponent>,
    private profile:ProfileService,
    @Inject(MAT_DIALOG_DATA) public user: any,
  ) {}
  ngOnInit(): void {

    this.userForm = new FormGroup({
      country:  new FormControl(this.user.country,[Validators.required]),
      city: new FormControl(this.user.city,[Validators.required]),
      post_code: new FormControl(this.user.post_code,[Validators.required,Validators.minLength(5),Validators.maxLength(5)]),
      address: new FormControl(this.user.address,[Validators.required]),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateAddress(){
    this.profile.updateProfile(this.userForm.value).subscribe({
      complete:()=>  null
    })
  }
  handleValidationStatus(isValid: boolean) {
    this.isValidPhone = isValid
  }


  get countryControl(): FormControl {
    return this.userForm.get('country') as FormControl;
  }
  get cityControl(): FormControl {
    return this.userForm.get('city') as FormControl;
  }
  get postCodeControl(): FormControl {
    return this.userForm.get('post_code') as FormControl;
  }
  get addressControl(): FormControl {
    return this.userForm.get('address') as FormControl;
  }



}
