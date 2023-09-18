import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-collapsed-menu',
  templateUrl: './collapsed-menu.component.html',
  styleUrls: ['./collapsed-menu.component.scss']
})
export class CollapsedMenuComponent {
  isExpanded = false; // search bar
  constructor(private auth:AuthService,private alert:AlertService) {

  }
  toggleSearch() {
    this.isExpanded = !this.isExpanded;
  }



  onBlur(event: FocusEvent) {
    const target = event.relatedTarget as HTMLElement;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'SELECT')) {
      event.preventDefault();
    } else {
      this.isExpanded = false;
    }
  }
}
