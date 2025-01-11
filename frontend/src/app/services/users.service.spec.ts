import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { User } from '../models/user.model';
import { mockAdminUser, mockCustomerUser } from './../../mocks/mockUser';
import { mockEnvironment } from './../../environments/environment.mock';
import { environment } from './../../environments/environment'

describe('UsersService', () => {
  let service: UsersService;
  // The HttpTestingController is used to test and verify the HTTP calls.
  let httpMock: HttpTestingController;

  // A mock environment is provided to replace the environment.API_URL used in the service.
  // The idea is to simulate a response without consulting a real API
  // For that reason we have a mockEnvironment instead of the original environment

  beforeEach(() => {
    TestBed.configureTestingModule({
      // HttpClientTestingModule is imported to mock HTTP requests.
      imports: [HttpClientTestingModule],
      // This is to override the default environment object used in your Angular application with a mocked version (mockEnvironment) during testing.
      //provide: Specifies the token to be overridden (environment in this case).
      // useValue: Supplies the value to use instead of the original (mockEnvironment).
      providers: [
        UsersService,
        { provide: environment, useValue: mockEnvironment },
      ],
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensures no pending HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create an admin', waitForAsync(() => {
    const mockResponse: User = {
      idUser: 1,
      name: 'customer',
      username: 'customer',
      password: '$2a$10$3ejY/i65aR6Kj1eA5BLAMebKhYYSMKyySN8qEtddXWZcSt5id9f7S',
    };

    service.createAdmin(mockAdminUser).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${mockEnvironment.API_URL}/market/api/user/signup/admin`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockAdminUser);
    req.flush(mockResponse); // Mock the response
  }));

  it('should send a POST request to create a customer', waitForAsync (() => {
    const mockResponse: User = {
      idUser: 1,
      name: 'customer',
      username: 'customer',
      password: '$2a$10$3ejY/i65aR6Kj1eA5BLAMebKhYYSMKyySN8qEtddXWZcSt5id9f7S',
    };

    // Check the observable produced
    service.createCustomer(mockCustomerUser).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${mockEnvironment.API_URL}/market/api/user/signup/customer`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCustomerUser);
    req.flush(mockResponse); // Mock the response
  }));
});
