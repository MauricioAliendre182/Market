import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { AuthService } from '../../../services/auth.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let authServiceMock: any;

  beforeEach(waitForAsync(() => {
    authServiceMock = {
      user$: of({
        idUser: 1,
        name: 'testuser',
        username: 'testUser',
        password: 'password123',
        roles: ['ROLE_ADMIN'],
      }),
    };

    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [HttpClientTestingModule], // ✅ FIX: Add HttpClientTestingModule
      providers: [{ provide: AuthService, useValue: authServiceMock }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set user from AuthService', () => {
    expect(component.user).toEqual({
      idUser: 1,
      name: 'testuser',
      username: 'testUser',
      password: 'password123',
      roles: ['ROLE_ADMIN'],
    });
  });

  it('should return true for isAdminRole when user has ROLE_ADMIN', () => {
    expect(component.isAdminRole()).toBeTruthy();
  });

  it('should return false for isCustomerRole when user does not have ROLE_CUSTOMER', () => {
    expect(component.isCustomerRole()).toBeFalsy();
  });

  it('should display profile details correctly', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('My Profile');
    expect(compiled.querySelector('p').textContent).toContain('testuser');
    expect(compiled.querySelectorAll('p')[1].textContent).toContain('testUser');
    expect(compiled.querySelector('p:nth-of-type(3)').textContent).toContain('Admin');
    expect(compiled.querySelector('a[routerLink="/cms/grid"]')).toBeTruthy();
  });
});
