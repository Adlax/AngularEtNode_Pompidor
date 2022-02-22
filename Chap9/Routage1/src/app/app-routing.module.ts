import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Composant1Component } from './composant1/composant1.component';
import { Composant2Component } from './composant2/composant2.component';

const routes: Routes = [
  {path: 'toCompo2', component: Composant2Component}
];

export const Routing = RouterModule.forRoot(routes);


@NgModule({
  imports: [Routing],
  exports: [RouterModule]
})
export class AppRoutingModule { }
