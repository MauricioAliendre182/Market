import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../../../services/auth.service';
import { StoreService } from '../../../services/store.service';
import { ClientService } from '../../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { User } from 'src/app/models/user.model';
import { Client } from 'src/app/models/client.model';
import { mockResponseAdminUser } from '../../../../mocks/user.mock';
import { mockClient } from '../../../../mocks/client.mock';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;
  let storeServiceMock: any;
  let clientServiceMock: any;
  let routerMock: any;

  beforeEach(waitForAsync(() => {
    authServiceMock = {
      loginAndGet: jest.fn(),
    };

    storeServiceMock = {
      storeName: jest.fn(),
      storeRole: jest.fn(),
      storeClientId: jest.fn(),
    };

    clientServiceMock = {
      getAClientByEmail: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule], // ✅ FIX: Add HttpClientTestingModule and ReactiveFormsModule
      providers: [
        { provide: AuthService, useValue: authServiceMock }, // ✅ Ensure the service is provided
        { provide: StoreService, useValue: storeServiceMock },
        { provide: ClientService, useValue: clientServiceMock },
        { provide: Router, useValue: routerMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form initially', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should call loginAndGet and navigate on successful login', waitForAsync(() => {
    component.loginForm.setValue({ username: 'testuser', password: 'password123' });
    const mockUser: User = { ...mockResponseAdminUser, name: 'testuser', username: 'testuser', password: 'password123'  }
    const mockClientAdmin: Client = mockClient;

    authServiceMock.loginAndGet.mockReturnValue(of(mockUser));
    clientServiceMock.getAClientByEmail.mockReturnValue(of(mockClientAdmin));

    component.login();

    expect(authServiceMock.loginAndGet).toHaveBeenCalledWith({ username: 'testuser', password: 'password123' });
    expect(storeServiceMock.storeName).toHaveBeenCalledWith(mockUser);
    expect(storeServiceMock.storeRole).toHaveBeenCalledWith(mockUser);
    expect(clientServiceMock.getAClientByEmail).toHaveBeenCalledWith(mockUser.name);
    expect(storeServiceMock.storeClientId).toHaveBeenCalledWith(mockClientAdmin);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  }));

  it('should handle login errors correctly', waitForAsync(() => {
    component.loginForm.setValue({ username: 'testuser', password: 'wrongpassword' });
    authServiceMock.loginAndGet.mockReturnValue(throwError(() => new Error('Invalid credentials')));

    component.login();

    expect(component.errorMessage).toBe('Invalid username or password');
  }));
});
