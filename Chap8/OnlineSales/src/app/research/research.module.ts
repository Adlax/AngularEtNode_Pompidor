import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDisplayComponent } from './product-display/product-display.component';
import { ProductSelectionByCriteriaComponent } from './product-selection-by-criteria/product-selection-by-criteria.component';
import { ResearchService } from './research.service';

import { EvenOddPipe } from './even-odd.pipe';

@NgModule({
  exports:[],
  imports: [CommonModule],
  declarations:[ProductSelectionByCriteriaComponent,ProductDisplayComponent,EvenOddPipe],
  providers:[ResearchService],
  bootstrap:[]
})
export class ResearchModule {}
