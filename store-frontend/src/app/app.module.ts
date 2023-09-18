import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrderComponent } from './components/order/order.component';
import { AlertComponent } from './shared/alert/alert.component';
import { ProductFilterPipe } from './pipes/product-filter.pipe';
import { ApplicationErrorComponent } from './shared/application-error/application-error.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ResourceNotFoundComponent } from './shared/resource-not-found/resource-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilesModule } from './shared/files/files.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptorService } from './services/auth/error-interceptor.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TelInputModule } from './shared/custom-components/tel-input/tel-input.module';
import {  appInitializerProviders } from './shared/app-initializer/app-initializer';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SvgViewerComponent } from './shared/custom-components/svg-viewer/svg-viewer.component';
import { AddressDialogComponent } from './shared/child-components/profile/address-dialog/address-dialog.component';
import { CarouselComponent } from './shared/child-components/home/carousel/carousel.component';
import { ProductCardComponent } from './shared/child-components/product/product-card/product-card.component';
import { ProfileDialogComponent } from './shared/child-components/profile/profile-dialog/profile-dialog.component';
import { ProductFiltersComponent } from './shared/child-components/product/product-filters/product-filters.component';
import { RatingModule, RatingConfig } from 'ngx-bootstrap/rating';
import { StarRatingComponent } from './shared/custom-components/star-rating/star-rating.component';
import { CustomCarouselComponent } from './shared/child-components/home/custom-carousel/custom-carousel.component';
import { CartItemComponent } from './shared/child-components/cart/cart-item/cart-item.component';
import { CollapsedMenuComponent } from './shared/child-components/nav/collapsed-menu/collapsed-menu.component';
import { MobileMenuComponent } from './shared/child-components/nav/mobile-menu/mobile-menu.component';
import { SearchBarComponent } from './shared/child-components/nav/search-bar/search-bar.component';
import { UserComponent } from './shared/child-components/nav/user/user.component';
import { CartLinkComponent } from './shared/child-components/nav/cart-link/cart-link.component';
import { CalculateTotalPipe } from './pipes/calculate-total.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    CategoryListComponent,
    CategoryDetailsComponent,
    ContactComponent,
    ProductComponent,
    ProductDetailsComponent,
    ProfileComponent,
    OrderComponent,
    ProductFilterPipe,
    AlertComponent,
    ApplicationErrorComponent,
    PageNotFoundComponent,
    ResourceNotFoundComponent,
    NavbarComponent,
    FooterComponent,
    ProfileDialogComponent,
    AddressDialogComponent,
    CarouselComponent,
    SvgViewerComponent,
    ProductCardComponent,
    ProductFiltersComponent,
    StarRatingComponent,
    CustomCarouselComponent,
    CartItemComponent,
    CollapsedMenuComponent,
    MobileMenuComponent,
    SearchBarComponent,
    UserComponent,
    CartLinkComponent,
    CalculateTotalPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FilesModule,
    CarouselModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    AccordionModule.forRoot(),
    PaginationModule.forRoot(),
    RatingModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    TelInputModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    },
    appInitializerProviders,
    RatingConfig
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
