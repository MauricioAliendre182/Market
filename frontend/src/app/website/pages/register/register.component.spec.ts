import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { AuthService } from '../../../services/auth.service';
import { ClientService } from '../../../services/client.service';
import { UsersService } from '../../../services/users.service';
import { TokenService } from '../../../services/token.service';
import { StoreService } from '../../../services/store.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceMock: any;
  let clientServiceMock: any;
  let userServiceMock: any;
  let tokenServiceMock: any;
  let storeServiceMock: any;
  let routerMock: any;

  beforeEach(waitForAsync(() => {
    authServiceMock = {
      login: jest.fn(() => of({ token: 'fake-token' }))
    };

    clientServiceMock = {
      createAClient: jest.fn(() => of({ clientId: '1' }))
    };

    userServiceMock = {
      createCustomer: jest.fn(() => of({ username: 'testuser' }))
    };

    tokenServiceMock = {
      removeToken: jest.fn()
    };

    storeServiceMock = {
      storeName: jest.fn(),
      storeRole: jest.fn(),
      storeClientId: jest.fn()
    };

    routerMock = {
      navigate: jest.fn()
    };

    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule], // ✅ FIX: Add HttpClientTestingModule and ReactiveFormsModule
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: ClientService, useValue: clientServiceMock },
        { provide: UsersService, useValue: userServiceMock },
        { provide: TokenService, useValue: tokenServiceMock },
        { provide: StoreService, useValue: storeServiceMock },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should proceed to next step when all fields are valid', () => {
    component.signupForm.patchValue({
      id: '123', firstname: 'John', lastname: 'Doe', cellphone: '1234567890', address: '123 St', email: 'test@test.com'
    });
    component.nextStep();
    expect(component.step).toBe(2);
  });

  it('should display an error when fields are incomplete', () => {
    component.signupForm.patchValue({ firstname: 'John' });
    component.nextStep();
    expect(component.errorMessage).toBe('Please complete all fields correctly.');
  });

  it('should go back to the previous step', () => {
    component.step = 2;
    component.previousStep();
    expect(component.step).toBe(1);
  });

  it('should call createCustomer and login when submitting', waitForAsync(() => {
    component.signupForm.patchValue({
      id: '123', firstname: 'John', lastname: 'Doe', cellphone: '1234567890', address: '123 St', email: 'test@test.com', username: 'testuser', password: 'password123'
    });
    component.submit();

    expect(userServiceMock.createCustomer).toHaveBeenCalled();
    expect(authServiceMock.login).toHaveBeenCalled();
    expect(clientServiceMock.createAClient).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  }));

  it('should confirm exit if the form is not valid', () => {
    jest.spyOn(window, 'confirm').mockReturnValueOnce(true);
    expect(component.onExit()).toBe(true);
  });
});
