import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { switchMap } from 'rxjs';
import { LoadMorePages } from 'src/app/models/pagination.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{

  categoryId: string | null = null;
  limit = 10;
  offset = 0;
  productId: string | null = null;
  products: Product[] = [];

  constructor(
    // This is the active route where we have the :id
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {

  }
  ngOnInit(): void {
    // paramMap is to get the ID (must math in names :id => :id)
    // Concatenate the subscribes() with switchMap
    // switchMap must return an observable (the result of this.productService.getProductByCategory),
    // this is to avoid a callback hell with two subscriptions
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.categoryId = params.get("id")
        console.log(this.categoryId);
        if (this.categoryId){
          return this.productService.getProductByCategory(this.categoryId, this.limit, this.offset);
        }
        return []
      })
    )
    .subscribe(
      (data) => {
        this.products = data;
      }
    )

    // In this case we will not use paramMap because we are not using
    // params that comes directly in the URL, they are query parmas (?option=2)
    this.route.queryParamMap.subscribe(params => {
      // The query param is product (?product=1)
      this.productId = params.get('product');
      console.log(this.productId)
    })
  }

  loadMore(pagination: LoadMorePages) {
    if (this.categoryId) {
      this.productService.getProductByCategory(this.categoryId, pagination.limit, this.offset).subscribe(
        data => {
          console.log(data)
          this.products = [...this.products, ...data];
          this.offset += pagination.limit;
      })
    }
  }
}
