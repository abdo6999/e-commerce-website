import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageCategoriesComponent } from './components/manage-categories/manage-categories.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ManageCategoriesComponent,
    ManageOrdersComponent,
    ManageUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
