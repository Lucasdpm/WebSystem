import { AppComponent } from './app.component';

import { UserModule } from './User/user.module';
import { ProductModule } from './Product/product.module';
import { CoreModule } from './core/core.module';

import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    UserModule,
    ProductModule,
    CoreModule,
    BrowserModule,
    RouterModule
  ],
  providers: [
    provideClientHydration(),
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
