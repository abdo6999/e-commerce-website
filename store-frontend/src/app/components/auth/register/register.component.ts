import {  ChangeDetectionStrategy, Component,  Renderer2, ElementRef,  OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,

})
export class RegisterComponent implements OnInit  {
  registrationForm!:FormGroup
  minBirthYear: number; // min accepted Birth Year
  show = false // password show
  isValidPhone:boolean = false

  Options = { // tooltip Options
    'placement': 'bottom',
    'showDelay': 500,
  }







  constructor(private auth:AuthService,
    private router:Router,
    private fb:FormBuilder,
    private alert:AlertService,
    private storage:LocalStorageService){
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      this.minBirthYear = currentYear - 16;
    }



    ngOnInit(): void {
      this.registrationForm = this.fb.group({
        authCredentialsDot: new FormGroup({
          username : new FormControl(null),
          password: new FormControl(null,[Validators.required,
            Validators.pattern(
              /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
            )
          ]),
        }),
        createProfileDot: new FormGroup({
          first_name: new FormControl(null,[Validators.required, Validators.pattern('^[a-zA-Z]*$')]),
          last_name: new FormControl(null,[Validators.required, Validators.pattern('^[a-zA-Z]*$')]),
          email: new FormControl(null,{
            validators: [Validators.required, Validators.email],
            asyncValidators: [this.auth.emailValidator()],
            updateOn: 'blur', //
          }),
          gender:  new FormControl(null, [Validators.required]),
          age:  new FormControl(null),
          date_of_birth: new FormGroup({
            day: new FormControl(null,[Validators.required,Validators.max(31),Validators.min(1),Validators.pattern('^[0-9]*$')]),
            month: new FormControl(null,[Validators.required,Validators.max(12),Validators.min(1),Validators.pattern('^[0-9]*$')]),
            year: new FormControl(null,[Validators.required,Validators.max(this.minBirthYear),Validators.pattern('^[0-9]*$'),Validators.min(1900)]),
          },{validators: this.dateValidator}),
          phone: new FormControl(null),
          country:  new FormControl(null,[Validators.required]),
          city: new FormControl(null,[Validators.required]),
          post_code: new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(5)]),
          address: new FormControl(null,[Validators.required]),
        })
      })

    }

















    userRegister(){
      // set username and age internally
      if (this.registrationForm.valid && this.isValidPhone) {
        this.registrationForm.value.authCredentialsDot.username = this.emailControl.value
        this.registrationForm.value.createProfileDot.date_of_birth = new Date(
          Number(this.dateControl.value.year),
          Number(this.dateControl.value.month) - 1, // Months are zero-based
          Number(this.dateControl.value.day)
        );
        this.registrationForm.value.createProfileDot.age = this.calculateAge(this.dateControl.value)
        this.auth.registerUser(this.registrationForm.value).subscribe({
          next:(res)=>{
            this.auth.login(this.authCredentialsDotForm?.value).subscribe({
              next: (res) => {
                this.storage.setFirstName(res.first_name)
                this.storage.setProfileImage(res.profile_image)
                this.auth.setIsLogin(true);
              },
              error: (error) => {
                this.alert.error(error);
              },
              complete: () => this.router.navigate(["./home"])
            });
          },
          error: (error) => {
            this.alert.error(error);
          },
        })
      }else {
        alert("invalid form inputs")
      }
    }









    calculateAge(dateOfBirth: { year: number; month: number; day: number }): number {
      const birthDate = new Date(dateOfBirth.year, dateOfBirth.month - 1, dateOfBirth.day);
      const currentDate = new Date();
      let age = currentDate.getFullYear() - birthDate.getFullYear();
      if (
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() &&
          currentDate.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age;
    }



    handleValidationStatus(isValid: boolean) {
      this.isValidPhone = isValid
    }


    // validate if age >= 16
    dateValidator(control: AbstractControl): { [key: string]: any } | null {
      const calculateAge = (dateOfBirth: { year: number; month: number; day: number }): number =>{
        const birthDate = new Date(dateOfBirth.year, dateOfBirth.month - 1, dateOfBirth.day);
        const currentDate = new Date();
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        if (
          currentDate.getMonth() < birthDate.getMonth() ||
          (currentDate.getMonth() === birthDate.getMonth() &&
            currentDate.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        return age;
      }
      const day = control.get('day')?.value;
      const month = control.get('month')?.value;
      const year = control.get('year')?.value;
      if(day&&month&&year){
        let age = calculateAge({year,month,day})
        if(age >= 16){
          return null;
        }
        return { invalidDate: true };
      }else {
        return { invalidDate: true };
      }
    }




    // geterr



    get authCredentialsDotForm(): FormGroup {
      return this.registrationForm.get('authCredentialsDot') as FormGroup;
    }

    get usernameControl(): FormControl {
      return this.authCredentialsDotForm.get('username') as FormControl;
    }

    get passwordControl(): FormControl {
      return this.authCredentialsDotForm.get('password') as FormControl;
    }
    get createProfileDotForm(): FormGroup {
      return this.registrationForm.get('createProfileDot') as FormGroup;
    }

    get firstnameControl(): FormControl {
      return this.createProfileDotForm.get('first_name') as FormControl;
    }

    get lastnameControl(): FormControl {
      return this.createProfileDotForm.get('last_name') as FormControl;
    }

    get emailControl(): FormControl {
      return this.createProfileDotForm.get('email') as FormControl;
    }

    get genderControl(): FormControl {
      return this.createProfileDotForm.get('gender') as FormControl;
    }

    get ageControl(): FormControl {
      return this.createProfileDotForm.get('age') as FormControl;
    }

    get dateControl(): FormGroup {
      return this.createProfileDotForm.get('date_of_birth') as FormGroup;
    }

    get dayControl(): FormControl {
      return this.dateControl.get('day') as FormControl;
    }
    get monthControl(): FormControl {
      return this.dateControl.get('month') as FormControl;
    }
    get yearControl(): FormControl {
      return this.dateControl.get('year') as FormControl;
    }

    get phoneControl(): FormControl {
      return this.createProfileDotForm.get('phone') as FormControl;
    }
    get countryControl(): FormControl {
      return this.createProfileDotForm.get('country') as FormControl;
    }
    get cityControl(): FormControl {
      return this.createProfileDotForm.get('city') as FormControl;
    }
    get postCodeControl(): FormControl {
      return this.createProfileDotForm.get('post_code') as FormControl;
    }
    get addressControl(): FormControl {
      return this.createProfileDotForm.get('address') as FormControl;
    }




}
