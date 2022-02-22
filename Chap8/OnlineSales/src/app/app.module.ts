import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ResearchModule } from './research/research.module';
import { AppComponent } from './app.component';
import { CartDisplayComponent } from './cart/cart-display/cart-display.component';
import { CartManagementComponent } from './cart/cart-management/cart-management.component';



@NgModule({
  declarations: [
    AppComponent,
    CartDisplayComponent,
    CartManagementComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ResearchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
