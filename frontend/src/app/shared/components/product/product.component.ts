import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent{
  @Input() product: Product = {
    productId: 0,
    name: '',
    categoryId: 0,
    price: 0,
    stock:0,
    active: false,
    imgUrl: '',
    category: {
      categoryId: 0,
      category: '',
      active: false
    }
  }

  @Output() addedProduct = new EventEmitter<Product>()
  @Output() showProduct = new EventEmitter<number>()

  onAddToCart() {
    this.addedProduct.emit(this.product)
  }

  onShowDetail() {
    this.showProduct.emit(this.product.productId)
  }
}
