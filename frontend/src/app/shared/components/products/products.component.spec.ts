import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ProductsService } from '../../../services/products.service';
import { StoreService } from '../../../services/store.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateProductDTO } from 'src/app/models/product.model';
import { mockCreateProductRequest, mockProductResponse } from '../../../../mocks/product.mock';
import { By } from '@angular/platform-browser';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productsServiceMock: any;
  let storeServiceMock: any;

  beforeEach(waitForAsync(() => {
    productsServiceMock = {
      getProduct: jest.fn((id) =>
        of({
          productId: id,
          name: 'Mock Product',
          categoryId: 2,
          price: 100,
          stock: 10,
          active: true,
          imgUrl: 'test.jpg',
          category: { categoryId: 2, category: 'Mock Category', active: true },
        })
      ),
      createProduct: jest.fn(() => of(null)),
      updateProduct: jest.fn(() => of(null)),
      deleteProduct: jest.fn(() => of(null)),
    };

    storeServiceMock = {
      getShoppingCart: jest.fn(() => of([])),
      addProduct: jest.fn(),
      getTotalPrice: jest.fn(() => 0),
      getRole: jest.fn(() => 'ROLE_CUSTOMER'),
    };

    TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [HttpClientTestingModule, FormsModule], // ✅ FIX: Add HttpClientTestingModule, FormsModule and SwiperModule
      providers: [
        { provide: ProductsService, useValue: productsServiceMock }, // ✅ Ensure the service is provided
        { provide: StoreService, useValue: storeServiceMock },
        {
          provide: ActivatedRoute, // Mocking paramMap as an observable
          useValue: {
            paramMap: of({ get: (key: string) => 'mockProductId' }), // Mocking snapshot params
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load a product when onShowDetail is called', waitForAsync(() => {
    component.onShowDetail(1);
    fixture.detectChanges();

    expect(productsServiceMock.getProduct).toHaveBeenCalledWith(1);
    expect(component.productChosen).toBeTruthy();
  }));

  it('should add a product to the shopping cart', waitForAsync(() => {
    const product = {
      productId: 1,
      name: 'Test Product',
      categoryId: 2,
      price: 100,
      stock: 10,
      active: true,
      imgUrl: 'test.jpg',
      category: { categoryId: 2, category: 'Test Category', active: true },
    };
    component.onAddToShoppingCart(product);

    expect(storeServiceMock.addProduct).toHaveBeenCalledWith(product);
  }));

  it('should have a list of app-product components', waitForAsync(() => {
    // Arrange
    component.products = [
      { ...mockProductResponse },
      { ...mockProductResponse },
      { ...mockProductResponse }
    ];

    // Act
    fixture.detectChanges();
    const debugElement = fixture.debugElement.queryAll(By.css('app-product'));

    // Assert
    expect(debugElement.length).toEqual(3);
  }));

  it('should call deleteProduct when deleting a product', waitForAsync(() => {
    component.productChosen = { productId: 1 } as any;
    component.deleteAProduct();

    expect(productsServiceMock.deleteProduct).toHaveBeenCalledWith(1);
  }));

  it('should call createProduct when creating a product', waitForAsync(() => {
    const newProduct: CreateProductDTO = mockCreateProductRequest
    component.createNewProduct(newProduct);

    expect(productsServiceMock.createProduct).toHaveBeenCalledWith(newProduct);
  }));

  it('should call updateProduct when updating a product', waitForAsync(() => {
    component.productChosen = { productId: 1, name: 'Tomatoe' } as any;
    component.updateAProduct({ name: "Updated Name" });

    expect(productsServiceMock.updateProduct).toHaveBeenCalledWith({ name: 'Updated Name' }, 1);
  }));

  it('should check if user is admin', waitForAsync(() => {
    storeServiceMock.getRole.mockReturnValue('ROLE_ADMIN');
    expect(component.isAdminUser()).toBeTruthy();
  }));
});
