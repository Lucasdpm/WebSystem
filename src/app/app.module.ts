import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { NgxMaskDirective, provideNgxMask , NgxMaskPipe} from 'ngx-mask';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { HeaderComponent } from './template/header/header.component';
import { FooterComponent } from './template/footer/footer.component';
import { UserDescriptionComponent } from './user-description/user-description.component';
import { LocalStorageService } from './local-storage.service';
import { UserService } from './user.service';
import { ProductDescriptionComponent } from './product-description/product-description.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserManagementComponent,
    ProductManagementComponent,
    HeaderComponent,
    FooterComponent,
    UserDescriptionComponent,
    ProductDescriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    NgxMaskDirective, NgxMaskPipe
  ],
  providers: [
    provideClientHydration(),
    provideNgxMask(),
    LocalStorageService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
