import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycartComponent } from './mycart.component';

describe('MycartComponent', () => {
  let component: MycartComponent;
  let fixture: ComponentFixture<MycartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MycartComponent]
    });
    fixture = TestBed.createComponent(MycartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
