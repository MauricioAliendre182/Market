import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../../services/products.service'
import { Product } from 'src/app/models/product.model';
import { LoadMorePages, Pagination } from 'src/app/models/pagination.model';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  products: Product[] = [];
  offset = 0;
  productId: string | null = null;

  constructor(
    // We inject Activated route to manage query params
    private route: ActivatedRoute,
    private productService: ProductsService
  ){}

  ngOnInit() {
    // this.loadMore()
    this.productService.getAllProducts().subscribe(
      data => {
        console.log(data)
        this.products = data
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
    this.productService.getProdcutByPage(pagination.limit, this.offset).subscribe(
      data => {
        console.log(data)
        this.products = [...this.products, ...data];
        this.offset += pagination.limit;
    })
  }
}
