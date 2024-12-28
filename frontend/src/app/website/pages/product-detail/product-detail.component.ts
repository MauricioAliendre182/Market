import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId: string | null = null;
  product: Product | null = null;

  constructor(
    // Read the route using ActivateRoute
    private route: ActivatedRoute,
    private productService: ProductsService,
    private location: Location
  ){}

  ngOnInit(): void {
    // paramMap is to get the ID (must math in names :id => :id)
    // Concatenate the subscribes() with switchMap
    // switchMap must return an observable (the result of this.productService.getProduct()),
    // this is to avoid a callback hell with two subscriptions
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.productId = params.get("id")
        console.log(this.productId);
        if (this.productId){
          return this.productService.getProduct(this.productId);
        }
        return [null]
      })
    )
    .subscribe(
      (data) => {
        this.product = data;
      }
    )
  }

  goToBack() {
    // We can use Location to come back to a previous page
    this.location.back()
  }

}
