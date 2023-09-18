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
import { UserAuthGuard } from './guards/user-auth.guard';
import { ProfileResolver } from './resolvers/profile.resolver';
import { ordersResolver } from './resolvers/orders.resolver';
import { productsResolver } from './resolvers/products.resolver';
import { productDetailsResolver } from './resolvers/product-details.resolver';
import { categoryResolver } from './resolvers/category.resolver';
import { PreventIsLoginAccessGuard } from './guards/prevent-is-login-access.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent,
    resolve:{
      profileData: ProfileResolver
    },
    canActivate:[UserAuthGuard]
  },
  { path: 'orders', component: OrderComponent,
    resolve:{
      orderData: ordersResolver
    },
    canActivate:[UserAuthGuard]
  },
  { path: 'cart', component: CartComponent,
  },
  {
    path: 'auth', children: [
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent}
    ],
    canActivate:[PreventIsLoginAccessGuard]
  },
  {
    path: 'products', component: ProductComponent,
    resolve: {
      productData: productsResolver
    },
  },
  { path: 'products/:id', component: ProductDetailsComponent ,
    resolve:{
      productDetails:productDetailsResolver
    }
  },
  { path: 'category', component: CategoryListComponent ,
    resolve: {
      categoryData: categoryResolver
    }
  },
  { path: 'category/:id', component: CategoryDetailsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
