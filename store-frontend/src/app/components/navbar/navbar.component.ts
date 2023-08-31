import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener , ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild("login") loginRef!:ElementRef
  @ViewChild("register") registerRef!:ElementRef
  @ViewChild("managementMenu") managementMenuRef!:ElementRef
  @ViewChild("userMenu") userMenuRef!:ElementRef
  isMenuOpen = false;

  isLoggedIn: boolean= this.auth.isLoggedIn()
  constructor(private auth:AuthService,
    private router:Router){

  }

  ngAfterViewInit(): void {
    // if(this.auth.isAdmin()){
    //   this.loginRef.nativeElement.style.display = "none";
    //   this.registerRef.nativeElement.style.display = "none";
    // }else if (this.auth.isLoggedIn()){
    //   this.loginRef.nativeElement.style.display = "none";
    //   this.registerRef.nativeElement.style.display = "none";
    //   this.managementMenuRef.nativeElement.style.display = "none";
    // }else {
    //   this.managementMenuRef.nativeElement.style.display = "none";
    //   this.userMenuRef.nativeElement.style.display = "none";
    // }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth >= 991) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
