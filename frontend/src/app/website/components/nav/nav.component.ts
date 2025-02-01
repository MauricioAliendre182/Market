import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { User } from 'src/app/models/user.model';
import { switchMap } from 'rxjs/operators';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
  activeMenu = false;
  counter = 0;
  token = '';
  profile: User | null = null;
  private sub$!: Subscription;
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoryService: CategoriesService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
  ngOnInit(): void {
    this.sub$ = this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
    this.getAllCategories();
    // Here we can get the state of the user ($user)
    // In this case we will get its state and we store it in
    // the vairable 'profile'
    // As we are doing this here
    // will not be necessary to store the user in the subscription of the method .getProfile()
    // instead we could redirect to his profile
    this.authService.user$.subscribe((data) => {
      this.profile = data;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService
      .loginAndGet({
        username: 'admin2',
        password: 'admin2',
      })
      .subscribe((profile) => {
        this.profile = profile;
        // this.storeService.storeClientId(profile);
      });
  }

  getProfile() {
    this.authService.getProfile().subscribe(() => {
      // Redirect to the profile, instead of storing the user state here
      this.router.navigate(['/user/profile']);
    });
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe((data) => {
      this.categories = data;
    });
  }

  logout() {
    this.authService.logout();
    // We need to clear the profile too at the moment to close session
    this.profile = null;
    // Clear localstorage
    localStorage.clear()
    // Redirect me at /home page
    this.router.navigate(['/home']);
  }
}
