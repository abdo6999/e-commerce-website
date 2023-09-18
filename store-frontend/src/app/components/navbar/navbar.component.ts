import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener , Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NavbarComponent   {
  isMenuOpen = false;

  first_name: string | null = localStorage.getItem("first_name")
  profile_image:string | null = localStorage.getItem("profile_image")

  constructor(private auth:AuthService){}


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth >= 576) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
