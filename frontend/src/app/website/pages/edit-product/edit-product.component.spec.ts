import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditProductComponent } from './edit-product.component';
import { ProductsService } from '../../../services/products.service';
import { CategoriesService } from '../../../services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;
  let productServiceMock: any;
  let categoriesServiceMock: any;
  let routerMock: any;

  beforeEach(waitForAsync(() => {
    productServiceMock = {
      getProduct: jest.fn(() => of({ name: 'Test Product', categoryId: 1, price: 100, stock: 10, active: true, imgUrl: 'test.jpg' })),
      updateProduct: jest.fn(() => of({}))
    };

    categoriesServiceMock = {
      getAll: jest.fn(() => of([{ categoryId: 1, category: 'Electronics', active: true }]))
    };

    routerMock = { navigate: jest.fn() };

    TestBed.configureTestingModule({
      declarations: [EditProductComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        FormBuilder,
        { provide: ProductsService, useValue: productServiceMock },
        { provide: CategoriesService, useValue: categoriesServiceMock },
        { provide: Router, useValue: routerMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } },
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', waitForAsync(() => {
    expect(component.editProductForm.value).toEqual({
      active: true,
      categoryId: 1,
      imgUrl: 'test.jpg',
      name: 'Test Product',
      price: 100,
      stock: 10
    });
  }));

  it('should initialize the form with product values after loading', waitForAsync(() => {
    const product = {
      active: true,
      categoryId: 1,
      imgUrl: 'test.jpg',
      name: 'Test Product 2',
      price: 100,
      stock: 10
    };

    // Mock the service to return the product
    jest.spyOn(productServiceMock, 'getProduct').mockReturnValue(of(product));

    component.ngOnInit(); // Trigger ngOnInit to load the product

    expect(component.editProductForm.value).toEqual(product);
  }));

  it('should load categories on init', waitForAsync(() => {
    expect(categoriesServiceMock.getAll).toHaveBeenCalled();
    expect(component.categories.length).toBe(1);
  }));

  it('should load product data on init', waitForAsync(() => {
    expect(productServiceMock.getProduct).toHaveBeenCalledWith(1);
    expect(component.editProductForm.value.name).toBe('Test Product');
  }));

  it('should call updateProduct when form is submitted', waitForAsync(() => {
    component.editProductForm.patchValue({ name: 'Updated Product', categoryId: 1, price: 150, stock: 5, active: true, imgUrl: 'updated.jpg' });
    component.onSubmit();
    expect(productServiceMock.updateProduct).toHaveBeenCalledWith(expect.any(Object), 1);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  }));

  it('should navigate back to products when cancel is clicked', waitForAsync(() => {
    component.cancel();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  }));
});
