import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycartComponent } from './mycart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsService } from '../../../services/products.service';
import { PurchasesService } from '../../../services/purchases.service';
import { FormsModule } from '@angular/forms';

describe('MycartComponent', () => {
  let component: MycartComponent;
  let fixture: ComponentFixture<MycartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MycartComponent],
      imports: [HttpClientTestingModule, FormsModule], // ✅ FIX: Add HttpClientTestingModule and FormsModule
      providers: [
        ProductsService, // ✅ Ensure the service is provided
        PurchasesService, // ✅ Ensure the service is provided
      ]
    });
    fixture = TestBed.createComponent(MycartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
