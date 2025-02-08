import { TestBed, waitForAsync } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { mockEnvironment } from './../../environments/environment.mock';
import { environment } from './../../environments/environment';
import { TokenService } from './token.service';
import { Auth } from '../models/auth.model';
import { LoginUser, User } from '../models/user.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      // This is to override the default environment object used in your Angular application with a mocked version (mockEnvironment) during testing.
      // provide: Specifies the token to be overridden (environment in this case).
      // useValue: Supplies the value to use instead of the original (mockEnvironment).
      providers: [
        AuthService,
        TokenService,
        { provide: environment, useValue: mockEnvironment },
      ],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpMock.verify(); // Ensures no pending HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test for login', () => {
    it('should return a token', waitForAsync(() => {
      //Arrange
      const mockData: Auth = {
        access_token: '121212',
      };

      const mockUser: LoginUser = {
        username: 'cesar@gmail.com',
        password: '1212',
      };

      //Act
      service.login(mockUser).subscribe((data) => {
        //Assert
        expect(data.body).toEqual(mockData);
      });

      //http config
      const url = `${environment.API_URL}/market/api/user/login`;
      const req = httpMock.expectOne(url);
      req.flush(mockData);
    }));
  });

  it('should call to saveToken', waitForAsync(() => {
    //Arrange
    const mockData: Auth = {
      access_token: '121212',
    };

    const mockUser: LoginUser = {
      username: 'cesar@gmail.com',
      password: '1212',
    };

    jest.spyOn(tokenService, 'saveToken').mockReturnValue();

    //Act
    service.login(mockUser).subscribe((data) => {
      //Assert
      expect(data.body).toEqual(mockData);
      expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
    });
    //http config
    const url = `${environment.API_URL}/market/api/user/login`;
    const req = httpMock.expectOne(url);
    req.flush(mockData);
  }));

  describe('test for getProfile', () => {
    it('should return user profile', waitForAsync(() => {
      // Arrange
      const mockUser: User = {
        idUser: 1,
        name: 'cesar',
        username: 'cesar@gmail.com',
        password: '12345',
        roles: ['ROLE_CUSTOMER'],
      };

      // Act
      jest.spyOn(tokenService, 'getToken').mockReturnValue('123');

      service.getProfile().subscribe((user) => {
        // Assertion
        expect(user).toEqual(mockUser);
      });

      const url = `${environment.API_URL}/market/api/user/profile`;
      const req = httpMock.expectOne(url);
      expect(req.request.headers.get('Token')).toBe('123');
      req.flush(mockUser);
    }));
  });

  describe('test for loginAndGet', () => {
    it('should login and return user profile', waitForAsync(() => {
      // Arrange
      const mockAuth: Auth = { access_token: '121212' };
      const mockUser: LoginUser = {
        username: 'cesar@gmail.com',
        password: '1212',
      };
      const mockProfile: User = {
        idUser: 1,
        name: 'cesar',
        username: 'cesar@gmail.com',
        password: '12345',
        roles: ['ROLE_CUSTOMER'],
      };

      // Act
      jest.spyOn(tokenService, 'saveToken').mockReturnValue();
      jest.spyOn(tokenService, 'getToken').mockReturnValue('121212');

      service.loginAndGet(mockUser).subscribe((profile) => {
        // Assertion
        expect(profile).toEqual(mockProfile);
      });

      const loginUrl = `${environment.API_URL}/market/api/user/login`;
      const profileUrl = `${environment.API_URL}/market/api/user/profile`;

      const loginReq = httpMock.expectOne(loginUrl);
      loginReq.flush(mockAuth);

      const profileReq = httpMock.expectOne(profileUrl);
      profileReq.flush(mockProfile);
    }));
  });

  describe('test for logout', () => {
    it('should clear token and set user to null', waitForAsync(() => {
      // Arrange
      jest.spyOn(tokenService, 'removeToken').mockReturnValue();
      const userSpy = jest.spyOn(service['user'], 'next');

      // Act
      service.logout();

      // Assertion
      expect(tokenService.removeToken).toHaveBeenCalledTimes(1);
      expect(userSpy).toHaveBeenCalledWith(null);
    }));
  });
});
