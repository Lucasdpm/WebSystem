import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './User/login/login.component';
import { RegisterComponent } from './User/register/register.component';
import { HomeComponent } from './core/home/home.component';
import { ProductManagementComponent } from './Product/product-management/product-management.component';
import { UserManagementComponent } from './User/user-management/user-management.component';
import { UserFormComponent } from './User/user-form/user-form.component';
import { ProductFormComponent } from './Product/product-form/product-form.component';
import { ProductRegisterComponent } from './Product/product-register/product-register.component';
import { isLoggedInGuard } from './guards/is-logged-in.guard';
import { modPermitionGuard } from './guards/mod-permition.guard';

const routes: Routes = [
  //  { path: '', redirectTo: '/login', pathMatch: 'full'},
  //  { path: 'login', component: LoginComponent},
  //  { path: 'register', component: RegisterComponent},
  //  { path: 'home', component: HomeComponent, canActivate: [isLoggedInGuard]},
  //  { path: 'userManagement', component: UserManagementComponent, canActivate: [isLoggedInGuard, modPermitionGuard]},
  //  { path: 'productManagement', component: ProductManagementComponent, canActivate: [isLoggedInGuard]},
  //  { path: 'user/:id', component: UserDescriptionComponent, canActivate: [isLoggedInGuard, modPermitionGuard]},
  //  { path: 'product/:id', component: ProductDescriptionComponent, canActivate: [isLoggedInGuard]},
  //  { path: 'productRegister', component: ProductRegisterComponent, canActivate: [isLoggedInGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
