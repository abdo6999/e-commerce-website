import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import {  MatSidenavContainer } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  openSideNav(){
    this.toggleSidebar.emit();
  }
}
