import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CartService {

  constructor(private http: HttpClient) { }

  getCartProductsIds(email: string): Observable<any> {
    let url = "http://localhost:8888/CartProductsIds/" + email;
    return this.http.get(url);
  }

  getCartProducts(parametres: string): Observable<any> {
    let url = "http://localhost:8888/CartProducts/" + parametres;
    return this.http.get(url);
  }

  modifyCart(action: string, id: number, email: string): Observable<any> {
    let httpOptions = { headers: new HttpHeaders('Content-type','application/json')};
    let observable: Observable<any>;
    if(action=='add'){
      observable = this.http.post('http://localhost:8888/CartProducts', {"productId":id,"email":email}, httpOptions);
      return observable;
    }
    if(action=='remove'){
      observable = this.http.delete('http://localhost:8888/CartProducts/productId=' + id + '/email=' + email , httpOptions);
      return observable;
    }
  }

  cartReset(email: string): Observable<any> {
    let url = 'http://localhost:8888/Cart/reset/email=' + email;
    return this.http.get(url);
  }

}
