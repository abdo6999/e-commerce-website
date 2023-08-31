import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  authCredentialsDot!: FormGroup
  show = false
  modalRef!:BsModalRef;
  @ViewChild('invalidCredentials',{static:false}) invalidCredentials!:TemplateRef<any>;
  constructor(private auth:AuthService,
    private router:Router,
    private cart:CartService,
    private fb:FormBuilder,
    private modalService:BsModalService,
    private alert:AlertService){}
  ngOnInit(): void {
    if (this.auth.isLoggedIn()){
      this.router.navigate(["/home"])
    }

    this.authCredentialsDot = this.fb.group({
      username: new FormControl(null),
      password: new FormControl(null)
    })
  }
  userLogin(){
    console.log(this.authCredentialsDot.value)
    this.auth.login(this.authCredentialsDot.value).subscribe({
      next: (res) => {
        localStorage.setItem("token", res.accessToken);
        this.router.navigate(["./home"]);
      },
      error: (error) => {
        this.alert.error(error);
        this.modalService.show(this.invalidCredentials);
      },
      complete: () => console.log('complete')
    });
  }

  showModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template)
  }

  hideModal(){
    this.modalService.hide()
  }
}
