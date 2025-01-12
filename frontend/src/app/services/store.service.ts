import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private myShoppingCart: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);

  // Generate a subscriber
  // Observable pattern: hear actively changes
  myCart$ = this.myCart.asObservable();

  // constructor() { }

  addProduct(product: Product) {
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart);
  }

  getShoppingCart() {
    return this.myShoppingCart;
  }
  getTotal() {
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0)
  }
}
