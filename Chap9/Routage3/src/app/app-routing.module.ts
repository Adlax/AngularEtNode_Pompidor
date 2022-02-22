import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';

const routes: Routes = [
  {path:'toComp2', component: Component2Component},
  {
    path: 'toVipComp2',
    component: Component2Component,
    outlet:'vipTarget',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
