import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { mockAdminUser, mockCustomerUser, mockResponseAdminUser, mockResponseCustomerUser } from '../../mocks/user.mock';
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
      // Angular offers this module for testing -> equivalent HttpClient
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
    // mockReponseAdminUser is what BE is supposed to return
    service.createAdmin(mockAdminUser).subscribe((response) => {
      expect(response).toEqual(mockResponseAdminUser);
    });

    // http config
    const req = httpMock.expectOne(
      `${mockEnvironment.API_URL}/market/api/user/signup/admin`
    );

    // with req.flush we return the data that we want
    req.flush(mockResponseAdminUser); // Mock the response

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockAdminUser);
    httpMock.verify()
  }));

  it('should send a POST request to create a customer', waitForAsync (() => {
    // Check the observable produced
    // mockReponseCustomerUser is what BE is supposed to return
    service.createCustomer(mockCustomerUser).subscribe((response) => {
      expect(response).toEqual(mockResponseCustomerUser);
    });

    const req = httpMock.expectOne(
      `${mockEnvironment.API_URL}/market/api/user/signup/customer`
    );

    // with req.flush we return the data that we want
    req.flush(mockResponseCustomerUser); // Mock the response

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCustomerUser);
    httpMock.verify();
  }));
});
