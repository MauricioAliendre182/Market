import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { Product, UpdateProductDTO } from '../../../models/product.model';
import { Category } from '../../../models/category.model';
import { CategoriesService } from '../../../services/categories.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  editProductForm!: FormGroup;
  productId!: number;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    // paramMap is to get the ID (must math in names :id => :id)
    // Concatenate the subscribes() with switchMap
    // switchMap must return an observable (the result of this.productService.getProduct()),
    // this is to avoid a callback hell with two subscriptions
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.initializeForm();
    this.loadCategories();
    this.loadProduct();
  }

  initializeForm() {
    this.editProductForm = this.fb.group({
      name: ['', Validators.required],
      categoryId: [null, Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      active: [false],
      imgUrl: ['', Validators.required]
    });
  }

  loadCategories() {
    // Assume this method fetches categories from an API
    this.categoriesService.getAll().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadProduct() {
    this.productService.getProduct(this.productId).subscribe(product => {
      this.editProductForm.patchValue(product);
    });
  }

  onSubmit() {
    if (this.editProductForm.valid) {
      const updatedProduct: UpdateProductDTO = this.editProductForm.value;
      this.productService.updateProduct(updatedProduct, this.productId).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}
