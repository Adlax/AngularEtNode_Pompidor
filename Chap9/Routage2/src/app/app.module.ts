import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Composant1Component } from './composant1/composant1.component';
import { Composant2Component } from './composant2/composant2.component';
import { Composant3Component } from './composant3/composant3.component';
import { Composant4Component } from './composant4/composant4.component';

@NgModule({
  declarations: [
    AppComponent,
    Composant1Component,
    Composant2Component,
    Composant3Component,
    Composant4Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
