import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private myShoppingCart: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);

  // Store client ID to be used in our purchases
  private clientId = new BehaviorSubject<string>('0');

  // Generate a subscriber
  // Observable pattern: hear actively changes
  myCart$ = this.myCart.asObservable();
  clientId$ = this.clientId.asObservable();

  // constructor() { }

  storeClientId(user: User) {
    this.clientId.next(user.idUser.toString());
  }

  addProduct(product: Product) {
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart);
  }

  getShoppingCart() {
    return this.myShoppingCart;
  }

  getTotalPrice() {
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }

  getTotalPricePerItem(productId: number) {
    return this.myShoppingCart
      .filter((product) => productId === product.productId)
      .reduce((sum, item) => sum + item.price, 0);
  }

  getQuantityPerItem(productId: number) {
    return this.myShoppingCart.filter(
      (product) => productId === product.productId
    ).length;
  }

  clearCart() {
    this.myShoppingCart = [];
    this.myCart.next([]);
  }
}
