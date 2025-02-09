import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavComponent } from './nav.component';
import { CategoriesService } from '../../../services/categories.service';
import { StoreService } from '../../../services/store.service';
import { AuthService } from '../../../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let storeServiceMock: any;
  let authServiceMock: any;
  let categoryServiceMock: any;
  let routerMock: any;

  beforeEach(waitForAsync(() => {
    storeServiceMock = {
      myCart$: of([]),
    };

    authServiceMock = {
      user$: of(null),
      loginAndGet: jest.fn(() =>
        of({
          idUser: 1,
          name: 'testuser',
          username: 'testUser',
          password: '1234',
          roles: ['ROLE_ADMIN'],
        })
      ),
      getProfile: jest.fn(() =>
        of({
          idUser: 1,
          name: 'testuser',
          username: 'testUser',
          password: '1234',
          roles: ['ROLE_ADMIN'],
        })
      ),
      logout: jest.fn(),
    };

    categoryServiceMock = {
      getAll: jest.fn(() =>
        of([{ categoryId: 1, category: 'Vegetables', active: true }])
      ),
    };

    // Mock Router to prevent navigation errors during tests
    routerMock = {
      navigate: jest.fn(),
    };

    TestBed.configureTestingModule({
      declarations: [NavComponent],
      imports: [HttpClientTestingModule], // ✅ Fix: Import HttpClientTestingModule for HTTP-based services
      providers: [
        { provide: StoreService, useValue: storeServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: CategoriesService, useValue: categoryServiceMock },
        { provide: Router, useValue: routerMock }, // Mock Router here
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
    // fixture is an Angular artifact
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // lifecycle hook to detect changes
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the menu when the button is clicked', waitForAsync(() => {
    const button = fixture.nativeElement.querySelector('button');

    // Initially, the menu should be closed
    expect(component.activeMenu).toBeFalsy();

    // Simulate button click to open the menu
    button.click();

    // fixture.detectChanges() is used to ensure that Angular updates the DOM after changes to component
    // properties or interactions (like clicks or data updates).
    fixture.detectChanges();

    // Now, the menu should be open
    expect(component.activeMenu).toBeTruthy();
  }));

  it('should display the correct username when profile is available', waitForAsync(() => {
    // Simulate a logged-in user
    component.profile = {
      idUser: 1,
      name: 'testuser',
      username: 'testUser',
      password: '1234',
      roles: ['ROLE_ADMIN'],
    };
    fixture.detectChanges(); // Trigger change detection to update the view

    // fixture.nativeElement.querySelector() is used to access DOM elements directly to check or trigger events
    const usernameElement: HTMLElement =
      fixture.nativeElement.querySelector('a[routerLink="/profile"]');

    // Assert that the username is displayed correctly
    expect(usernameElement.textContent).toBe('testUser');
  }));

  it('should display the login link when no profile is available', waitForAsync(() => {
    component.profile = null; // No user logged in
    fixture.detectChanges();

    const loginLink: HTMLElement = fixture.nativeElement.querySelector(
      'a[routerLink="/login"]'
    );

    // Assert that the login link is displayed
    expect(loginLink).toBeTruthy();
  }));

  it('should display categories correctly when available', waitForAsync(() => {
    component.categories = [
      { categoryId: 1, category: 'Vegetables', active: true },
      { categoryId: 2, category: 'Fruits', active: true },
      { categoryId: 3, category: 'Meat', active: true },
      { categoryId: 4, category: 'Electronics', active: true },
      { categoryId: 5, category: 'Canned', active: true },
      { categoryId: 6, category: 'Utensils', active: true },
      { categoryId: 7, category: 'For Pets', active: true },
    ];
    fixture.detectChanges(); // Trigger change detection to update the view

    const categoryElements =
      fixture.nativeElement.querySelectorAll('a[routerLink]');

    // Assert that the number of category links matches the number of categories
    expect(categoryElements.length).toBe(component.categories.length);
  }));

  it('should call logout when the logout button is clicked', waitForAsync(() => {
    // Simulate a logged-in user
    component.profile = {
      idUser: 1,
      name: 'testuser',
      username: 'testUser',
      password: '1234',
      roles: ['ROLE_ADMIN'],
    };

    // Ensure change detection is triggered so the DOM is updated
    fixture.detectChanges();

    const logoutButton: HTMLButtonElement =
      fixture.nativeElement.querySelector('.account button');

    // Spy on the logout method
    const logoutSpy = jest.spyOn(component, 'logout');

    // Simulate logout button click
    logoutButton.click();

    // Assert that the logout method is called
    expect(logoutSpy).toHaveBeenCalled();
  }));

  it('should call getAllCategories to fetch categories', waitForAsync(() => {
    // Spies (using jest.spyOn()) are used to track method calls, especially for methods like logout() or getAllCategories()
    const getCategoriesSpy = jest.spyOn(component, 'getAllCategories');

    component.ngOnInit(); // Trigger ngOnInit to fetch categories
    fixture.detectChanges();

    // Assert that the getAllCategories method was called
    expect(getCategoriesSpy).toHaveBeenCalled();
  }));
});
