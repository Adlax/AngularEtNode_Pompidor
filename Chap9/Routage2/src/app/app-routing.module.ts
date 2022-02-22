import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Composant1Component } from './composant1/composant1.component';
import { Composant2Component } from './composant2/composant2.component';
import { Composant3Component } from './composant3/composant3.component';
import { Composant4Component } from './composant4/composant4.component';

const routes: Routes = [
  {
    path: 'toComp1',
    component: Composant1Component,
    children: [
      {path: 'toComp3', component: Composant3Component},
      {path: 'toComp4', component: Composant4Component}
    ]
  },
  {
    path: 'toComp2',
    component: Composant2Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
