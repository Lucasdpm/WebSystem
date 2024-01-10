import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule} from '@angular/material/table';
import { NgxMaskDirective, provideNgxMask , NgxMaskPipe} from 'ngx-mask';

import { UserService } from '../user.service';
import { LoginComponent } from '../User/login/login.component';
import { RegisterComponent } from '../User/register/register.component';
import { UserManagementComponent } from '../User/user-management/user-management.component';
import { UserDescriptionComponent } from '../User/user-description/user-description.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserManagementComponent,
    UserDescriptionComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ReactiveFormsModule,
    MatTableModule
  ],
  providers: [
    UserService,
    provideNgxMask(),
    provideClientHydration()
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    UserManagementComponent,
    UserDescriptionComponent
  ]
})
export class UserModule { }
