import { Component, ViewChild } from '@angular/core';
import { MainContentComponent } from './components/main-content/main-content.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('mainContent') mainContent!: MainContentComponent;
  title = 'store-frontend';
  
  toggleSidebar() {
    this.mainContent.sidenav.toggle();
  }
}
