import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsService } from '../../../services/products.service';
import { ProductsComponent } from '../../../shared/components/products/products.component';
import { FormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, ProductsComponent],
      imports: [HttpClientTestingModule, FormsModule], // ✅ FIX: Add HttpClientTestingModule and FormsModule
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
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
