import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { PurchasesService } from './purchases.service';
import { mockEnvironment } from './../../environments/environment.mock';
import { environment } from './../../environments/environment';
import { mockPurchase } from './../../mocks/purchase.mock';
import { CreatePurchaseDTO, Purchase } from '../models/purchase.model';

describe('PurchasesService', () => {
  let service: PurchasesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PurchasesService,
        { provide: environment, useValue: mockEnvironment },
      ],
    });
    service = TestBed.inject(PurchasesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test for createAPurchase', () => {
    it('should create a purchase', waitForAsync(() => {
      const dto: CreatePurchaseDTO = { ...mockPurchase };

      service.createAPurchase(dto).subscribe((purchase) => {
        expect(purchase).toEqual(mockPurchase);
      });

      const req = httpMock.expectOne(
        `${mockEnvironment.API_URL}/market/api/purchases/save`
      );
      req.flush(mockPurchase);
      expect(req.request.method).toBe('POST');
    }));
  });

  describe('test for getAllPurchases', () => {
    it('should get all purchases', waitForAsync(() => {
      const mockPurchases: Purchase[] = [
        { ...mockPurchase },
        { ...mockPurchase },
      ];

      service.getAllPurchases().subscribe((purchases) => {
        expect(purchases.length).toBe(2);
        expect(purchases).toEqual(mockPurchases);
      });

      const req = httpMock.expectOne(
        `${mockEnvironment.API_URL}/market/api/purchases/all`
      );
      req.flush(mockPurchases);
      expect(req.request.method).toBe('GET');
    }));

    it('should return error when purchases not found (404)', waitForAsync(() => {
      service.getAllPurchases().subscribe({
        next: () => {
          fail('Expected an error, but got a response');
        },
        error: (error) => {
          expect(error).toBe('Not found');
        },
      });

      const retry = 2;
      for (let i = 0, c = retry + 1; i < c; i++) {
        const req = httpMock.expectOne(
          `${mockEnvironment.API_URL}/market/api/purchases/all`
        );
        req.flush('Not found', { status: 404, statusText: 'Not Found' });
      }
    }));
  });

  describe('test for getAPurchaseByUser', () => {
    it('should get a purchase by user', waitForAsync(() => {
      const userId = '123';

      service.getAPurchaseByUser(userId).subscribe((purchase) => {
        expect(purchase).toEqual(mockPurchase);
      });

      const req = httpMock.expectOne(
        `${mockEnvironment.API_URL}/market/api/purchases/client/123`
      );
      req.flush(mockPurchase);
      expect(req.request.method).toBe('GET');
    }));

    it('should return error when user purchases not found (404)', waitForAsync(() => {
      const userId = '123';

      service.getAPurchaseByUser(userId).subscribe({
        error: (error) => {
          expect(error).toBe(
            'The purchase associated to this user do not exist'
          );
        },
      });

      const req = httpMock.expectOne(
        `${mockEnvironment.API_URL}/market/api/purchases/client/123`
      );
      req.flush('The purchase associated to this user do not exist', {
        status: 404,
        statusText: 'Not Found',
      });
    }));

    it('should return error when server fails (500)', waitForAsync(() => {
      const userId = '123';

      service.getAPurchaseByUser(userId).subscribe({
        error: (error) => {
          expect(error).toBe('Server is failing');
        },
      });

      const req = httpMock.expectOne(
        `${mockEnvironment.API_URL}/market/api/purchases/client/123`
      );
      req.flush('Server is failing', {
        status: 500,
        statusText: 'Internal Server Error',
      });
    }));
  });
});
