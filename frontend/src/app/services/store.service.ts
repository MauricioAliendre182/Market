import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { Client } from '../models/client.model';

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

  constructor() {
    this.loadState()
  }

  /** Load data from localStorage on service initialization */
  private loadState() {
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
      this.myShoppingCart = JSON.parse(storedCart);
      this.myCart.next(this.myShoppingCart);
    }

    const storedClientId = localStorage.getItem('clientId');
    if (storedClientId) {
      this.clientId.next(storedClientId);
    }
  }

  storeClientId(client: Client) {
    localStorage.setItem("clientId", client.clientId.toString())
    this.clientId.next(client.clientId.toString());
  }

  // Store the username in the localstorage
  storeName(profile: User) {
    localStorage.setItem("nane", profile.name.toString())
  }

  getName() {
    return localStorage.getItem("name")
  }

  // Store the role in the localStorage
  storeRole(profile: User) {
    localStorage.setItem("role", profile.roles[0])
  }

  getRole() {
    return localStorage.getItem("role")
  }

  addProduct(product: Product) {
    this.myShoppingCart.push(product);
    localStorage.setItem('shoppingCart', JSON.stringify(this.myShoppingCart));
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
    localStorage.setItem('shoppingCart', JSON.stringify(this.myShoppingCart));
    this.myCart.next([]);
  }
}
