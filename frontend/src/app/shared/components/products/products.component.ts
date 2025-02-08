import { Component, EventEmitter, Input, Output} from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from 'src/app/models/product.model';
import {StoreService} from '../../../services/store.service'
import {ProductsService} from '../../../services/products.service'
import { LoadMorePages, Pagination } from 'src/app/models/pagination.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  myShoppingCart: Product[] = [];
  total = 0;
  limit = 0;
  @Input() products: Product[] = [];
  // @Input() productId: string | null = null;
  // Read the changes in productId in a Dynamic way
  @Input() set productId(id: string | null) {
    if (id) {
      this.onShowDetail(+id)
    }
  }
  @Output() onLoadMore: EventEmitter<LoadMorePages> = new EventEmitter<LoadMorePages>();

  today = new Date();
  date = new Date(2023, 1, 21)
  showProductDetail = false
  productChosen: Product = {
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
  };
  statusDetail: 'loading' | "success" | "error" | "init" = "init"

  constructor(
    private storeService: StoreService,
    private productService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product)
    this.total = this.storeService.getTotalPrice();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: number) {
    this.statusDetail = 'loading';
    this.toggleProductDetail();
    this.productService.getProduct(id)
    .subscribe(
      data => {
      console.log('product', data)
      this.productChosen = data
      this.statusDetail = 'success';
    }, error => {
      console.error(error);
      window.alert(error)
      this.statusDetail = 'error'
    })
  }

  readAndUpdate(id: number) {
    // Avoiding Callback Hell with Observables
    this.productService.fetchFirstReadAndLastlyUpdate(id, {
      "name": "Tomatoe",
      "categoryId": 1,
      "price": 3.0,
      "stock": 10,
      "active": true
    })
    .subscribe(data => {
      console.log(data)
    })
    // Make two HTTP requests at the same time
    // It is recommended to have this in the service (As below)
    this.productService.fetchReadAndUpdate(id, {
      "name": "Tomatoe",
      "categoryId": 1,
      "price": 3.0,
      "stock": 10,
      "active": true
    })
    .subscribe(response => {
      const read = response[0]
      const update = response[1]
    })

  }
  createNewProduct() {
    const product: CreateProductDTO = {
      "name": "Tomatoe",
      "categoryId": 1,
      "price": 3.0,
      "stock": 10,
      "imgUrl": '',
      "active": true
  }
    this.productService.createProduct(product)
    .subscribe(
      data => {
        console.log('Created',data)
        this.products.unshift(data)
      }
    )
  }

  updateAProduct() {
    const product: UpdateProductDTO = {
      "name": "Tomatoe",
      "categoryId": 1,
      "price": 3.0,
      "stock": 10,
      "active": true
    }
    const id = this.productChosen.productId;
    this.productService.updateProduct(product, id)
    .subscribe((data) => {
      console.log("Updated", data)
      this.productChosen = data;
      this.products = this.products.map((item)=>{
        if (item.productId === data.productId) {
          return data;
        }
        return item;
      });
      // const productIndex = this.products.findIndex(item => item.productId === this.productChosen.productId)
      // this.products[productIndex] = data
    })
  }

  deleteAProduct() {
    const id = this.productChosen.productId;
    this.productService.deleteProduct(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(item => item.productId === this.productChosen.productId)
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    })
  }

  emitLoadMore() {
    this.onLoadMore.emit({ limit: this.limit });
  }

  isAdminUser() {
    return this.storeService.getRole() == 'ROLE_ADMIN';
  }
}
