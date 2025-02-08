import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryComponent } from './category.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProductsService } from '../../../services/products.service';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryComponent],
      imports: [HttpClientTestingModule], // ✅ FIX: Add HttpClientTestingModule
      providers: [
        ProductsService, // ✅ Ensure the service is provided
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => 'mockCategoryId' }), // Mock params
            queryParamMap: of({ get: (key: string) => 'mockProductId' }) // Mock query params
          }
        }
      ]
    });
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
