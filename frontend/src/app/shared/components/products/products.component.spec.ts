import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsService } from '../../../services/products.service';
import { FormsModule } from '@angular/forms';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [HttpClientTestingModule, FormsModule], // ✅ FIX: Add HttpClientTestingModule, FormsModule and SwiperModule
      providers: [
        ProductsService, // ✅ Ensure the service is provided
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({}), // Mocking paramMap as an observable
            snapshot: { paramMap: { get: () => null } } // Mocking snapshot params
          }
        }
      ]
    });
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
