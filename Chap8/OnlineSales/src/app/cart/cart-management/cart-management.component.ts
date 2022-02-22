import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-cart-management',
  templateUrl: './cart-management.component.html',
  styleUrls: ['./cart-management.component.css']
})
export class CartManagementComponent implements OnInit {

  action: string = '';
  email: string = '';
  numAction: number;

  constructor(private cartService: CartService, private router: Router, private route: Route) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.cartProductManagement(params["action"],params["id"]);
    } );
  }

  cartProductManagement(action,id): Observable<any> {
    if(action=='add') this.action = "Ajout";
    if(action=='delete') this.action = "Suppression";
    this.cartService.getProductById(id).subscribe( res => this.product=res );
    this.cartService.modifyCart(action,id,this.email)
        .subscribe( res => {
          this.router.navigate( [ '/cart', {outlets:{'cartDisplay':['display',this.numAction]}} ] );
          this.numAction++;
        } );
  }

  cartReset(){
    this.cartService.cartReset(this.email).subscribe( res => this.router.navigate( ['/cart' , {outlets:{'cartDisplay':['display']}}] ) );
  }

}
