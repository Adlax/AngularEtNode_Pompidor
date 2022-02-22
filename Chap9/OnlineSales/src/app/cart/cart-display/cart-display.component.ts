import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart-display',
  templateUrl: './cart-display.component.html',
  styleUrls: ['./cart-display.component.css']
})
export class CartDisplayComponent implements OnInit {

  private products: Object[];
  private email: string;
  private total: number = 0;

  constructor(private cartService: CartService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.cartService.getCartProducts('products/email='+this.email)
                      .subscribe( res => {
                        this.products = res;
                        this.total = 0;
                        for(let prod of res){
                          this.total += prod.nb * prod.price;
                        }
                      } );
    } );
  }

}
