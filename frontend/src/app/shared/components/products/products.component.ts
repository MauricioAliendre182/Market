import { Component, EventEmitter, Input, Output} from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from 'src/app/models/product.model';
import { StoreService } from '../../../services/store.service'
import { ProductsService } from '../../../services/products.service'
import { LoadMorePages, Pagination } from 'src/app/models/pagination.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

// TODO: Clean this file, improve where I can
export class ProductsComponent {

  myShoppingCart: Product[] = [];
  total = 0;
  limit = 0;
  @Input() products: Product[] = [];
  // @Input() productId: string | null = null;
  // Read the changes in productId in a Dynamic way
  // TODO: Search a way to detect changes when the same productId is selected
  @Input() set productId(id: string | null) {
    if (id) {
      this.onShowDetail(+id)
    }
  }
  @Output() onLoadMore: EventEmitter<LoadMorePages> = new EventEmitter<LoadMorePages>();

  today = new Date();
  date = new Date(2023, 1, 21);
  showProductDetail = false;
  showCreateProduct = false;
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
  productForm: FormGroup;
  statusDetail: 'loading' | "success" | "error" | "init" = "init"

  constructor(
    private storeService: StoreService,
    private productService: ProductsService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      // TODO: Grab the category instead of categoryId
      categoryId: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      active: [false],
      // TODO: Check the URL configuration, the API do not accept everything
      imgUrl: ['', [Validators.required]],
      taxes: [0]
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product)
    this.total = this.storeService.getTotalPrice();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
    this.showCreateProduct = false
  }

  toggleCreateProduct() {
    this.showCreateProduct = !this.showCreateProduct;
    this.showProductDetail = false;
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

  onCreateProduct() {
    if (this.productForm.valid) {
      this.productService.createProduct(this.productForm.value)
      .subscribe(
        data => {
          console.log('Created', data);
          this.products.unshift(data);
          this.toggleCreateProduct();
          this.productForm.reset({
            name: '',
            categoryId: 0,
            price: 0,
            stock: 0,
            active: false,
            imgUrl: '',
            taxes: 0
          });
          this.router.navigate(['/home'])
        }
      );
    }
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

  updateAProduct(product: UpdateProductDTO) {
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
      const productIndex = this.products.findIndex(item => item.productId === id);
      if (productIndex !== -1) {
        this.products.splice(productIndex, 1);
      }
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
