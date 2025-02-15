import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let debugElement: DebugElement;

  const mockProduct: Product = {
    productId: 1,
    name: 'Test Product',
    categoryId: 2,
    price: 100,
    stock: 10,
    active: true,
    imgUrl: 'test.jpg',
    category: {
      categoryId: 2,
      category: 'Test Category',
      active: true
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [RouterTestingModule]
    }).compileComponents();

    // fixture is an Angular artifact
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges(); // lifecycle hook to detect changes
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product details correctly', () => {
    component.product = mockProduct;
    fixture.detectChanges();

    const priceElement = debugElement.query(By.css('h2'));
    const nameElement = debugElement.query(By.css('p:first-of-type'));
    const categoryElement = debugElement.query(By.css('p[appHighlight]'));

    expect(priceElement.nativeElement.textContent).toContain('100');
    expect(nameElement.nativeElement.textContent).toContain('Test Product');
    expect(categoryElement.nativeElement.textContent).toContain('Test Category');
  });

  it('should emit event when add to cart is clicked', () => {
    jest.spyOn(component.addedProduct, 'emit');
    component.product = mockProduct;
    fixture.detectChanges();

    const addButton = debugElement.query(By.css('button'));
    addButton.triggerEventHandler('click', null);

    expect(component.addedProduct.emit).toHaveBeenCalledWith(mockProduct);
  });

  it('should emit event when see details is clicked', () => {
    jest.spyOn(component.showProduct, 'emit');
    component.product = mockProduct;
    fixture.detectChanges();

    component.onShowDetail();
    expect(component.showProduct.emit).toHaveBeenCalledWith(mockProduct.productId);
  });

  it('should only render product details if active', () => {
    component.product = { ...mockProduct, active: false };
    fixture.detectChanges();

    const container = debugElement.query(By.css('div'));
    expect(container).toBeNull();
  });
});
