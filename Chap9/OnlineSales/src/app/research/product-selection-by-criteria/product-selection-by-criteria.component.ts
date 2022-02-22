import { Component, OnInit } from '@angular/core';
import { ResearchService } from '../research.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-selection-by-criteria',
  templateUrl: './product-selection-by-criteria.component.html',
  styleUrls: ['./product-selection-by-criteria.component.css']
})
export class ProductSelectionByCriteriaComponent implements OnInit {

  private selectors: Object[] = [];

  constructor(private researchService: ResearchService, private router: Router) { }

  ngOnInit(): void {
    this.researchService.getProducts('selectors').subscribe( res => this.selectors = res );
  }

}
