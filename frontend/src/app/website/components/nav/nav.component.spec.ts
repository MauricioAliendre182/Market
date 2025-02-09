import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavComponent } from './nav.component';
import { CategoriesService } from '../../../services/categories.service';
import { StoreService } from '../../../services/store.service';
import { AuthService } from '../../../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let storeServiceMock: any;
  let authServiceMock: any;
  let categoryServiceMock: any;

  beforeEach(waitForAsync(() => {
    storeServiceMock = {
      myCart$: of([]),
    };

    authServiceMock = {
      user$: of(null),
      loginAndGet: jest.fn(() => of({ username: 'testUser' })),
      getProfile: jest.fn(() => of({ username: 'testUser' })),
      logout: jest.fn(),
    };

    categoryServiceMock = {
      getAll: jest.fn(() => of([{ categoryId: 1, category: 'Electronics' }])),
    };

    TestBed.configureTestingModule({
      declarations: [NavComponent],
      imports: [HttpClientTestingModule], // ✅ Fix: Import HttpClientTestingModule for HTTP-based services
      providers: [
        { provide: StoreService, useValue: storeServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: CategoriesService, useValue: categoryServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => 'mockCategoryId' }),
            queryParamMap: of({ get: (key: string) => 'mockProductId' }),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA], // ✅ Ignore unknown Angular elements like routerLink
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
