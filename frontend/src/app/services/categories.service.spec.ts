import { TestBed, waitForAsync } from '@angular/core/testing';

import { CategoriesService } from './categories.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { mockEnvironment } from './../../environments/environment.mock';
import { environment } from './../../environments/environment';
import { Category } from '../models/category.model';
import { mockkCategory } from './../../mocks/category.mock';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CategoriesService,
        { provide: environment, useValue: mockEnvironment },
      ],
    });
    service = TestBed.inject(CategoriesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test for getAll', () => {
    it('should get all categories', waitForAsync(() => {
      const mockCategories: Category[] = [
        { ...mockkCategory },
        { ...mockkCategory },
      ];

      service.getAll().subscribe((categories) => {
        expect(categories.length).toBe(2);
        expect(categories).toEqual(mockCategories);
      });

      const req = httpMock.expectOne(
        `${mockEnvironment.API_URL}/market/api/category`
      );
      req.flush(mockCategories);
      expect(req.request.method).toBe('GET');
    }));

    it('should get all categories with limit and offset', waitForAsync(() => {
      const mockCategories: Category[] = [
        { ...mockkCategory },
        { ...mockkCategory },
        { ...mockkCategory },
      ];
      const limit = 10;
      const offset = 2;

      service.getAll(limit, offset).subscribe((categories) => {
        expect(categories.length).toBe(3);
        expect(categories).toEqual(mockCategories);
      });

      const req = httpMock.expectOne(
        `${mockEnvironment.API_URL}/market/api/category?limit=10&offset=2`
      );
      req.flush(mockCategories);
      expect(req.request.method).toBe('GET');
    }));
  });
});
