import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { EvenOddPipe } from './even-odd.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductDisplayComponent,
    EvenOddPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
