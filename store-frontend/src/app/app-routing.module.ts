import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrderComponent } from './components/order/order.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { OrderService } from './services/order/order.service';
import { CartService } from './services/cart/cart.service';
import { AuthService } from './services/auth/auth.service';
import { ProductService } from './services/product/product.service';
import { CategoryService } from './services/category/category.service';
import { UserAuthGuard } from './guards/user-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent,
  // resolve:{
  //   orderData: OrderService
  // },
  canActivate:[UserAuthGuard]
  },
  { path: 'orders', component: OrderComponent,
    // resolve:{
    //   orderData: OrderService
    // },
    canActivate:[UserAuthGuard]
  },
  { path: 'cart', component: CartComponent,
    // resolve: {
    //   cartData: CartService
    // },
  },
  {
    path: 'auth', children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ],
    // resolve:{
    //   authData: AuthService
    // }
  },
  {
    path: 'products', component: ProductComponent,
    // resolve: {
    //   productData: ProductService
    // },
  },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'category', component: CategoryListComponent ,
    // resolve: {
    //   categoryData: CategoryService
    // }
  },
  { path: 'category/:id', component: CategoryDetailsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
