import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './template/header/header.component';
import { FooterComponent } from './template/footer/footer.component';
import { LocalStorageService } from './local-storage.service';

import { UserModule } from './User/user.module';
import { ProductModule } from './Product/product.module';

import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    UserModule,
    ProductModule,
    BrowserModule,
    RouterModule
  ],
  providers: [
    provideClientHydration(),
    LocalStorageService,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
