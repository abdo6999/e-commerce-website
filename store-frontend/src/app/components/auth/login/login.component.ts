import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
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
    private alert:AlertService,
    private storage:LocalStorageService){}
  ngOnInit(): void {

    this.authCredentialsDot = this.fb.group({
      username: new FormControl(null),
      password: new FormControl(null)
    })
  }
  userLogin(){
    this.auth.login(this.authCredentialsDot.value).subscribe({
      next: (res) => {
        this.storage.setFirstName(res.first_name)
        this.storage.setProfileImage(res.profile_image)
        this.auth.setIsLogin(true);
      },
      error: (error) => {
        this.alert.error(error);
        this.modalService.show(this.invalidCredentials);
      },
      complete: () => this.router.navigate(["./home"])
    });
  }

  showModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template)
  }

  hideModal(){
    this.modalService.hide()
  }
}
