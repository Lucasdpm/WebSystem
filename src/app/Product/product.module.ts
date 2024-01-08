import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule} from '@angular/material/table';
import { CurrencyMaskModule } from "ng2-currency-mask";

import { ProductManagementComponent } from '../Product/product-management/product-management.component';
import { ProductDescriptionComponent } from '../Product/product-description/product-description.component';
import { ProductRegisterComponent } from '../Product/product-register/product-register.component';

@NgModule({
  declarations: [
    ProductManagementComponent,
    ProductDescriptionComponent,
    ProductRegisterComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CurrencyMaskModule,
    ReactiveFormsModule,
    MatTableModule
  ],
  providers: [
    provideClientHydration()
  ]
})
export class ProductModule { }
