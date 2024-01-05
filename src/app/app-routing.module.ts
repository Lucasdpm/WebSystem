import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserDescriptionComponent } from './user-description/user-description.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { ProductRegisterComponent } from './product-register/product-register.component';

const routes: Routes = [
   { path: '', redirectTo: '/login', pathMatch: 'full'},
   { path: 'login', component: LoginComponent},
   { path: 'register', component: RegisterComponent},
   { path: 'home', component: HomeComponent},
   { path: 'userManagement', component: UserManagementComponent},
   { path: 'productManagement', component: ProductManagementComponent},
   { path: 'user/:id', pathMatch: 'full', component: UserDescriptionComponent},
   { path: 'product/:id', pathMatch: 'full', component: ProductDescriptionComponent},
   { path: 'productRegister', component: ProductRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
