import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  // Here we will have a user
  user: User | null = null;

  // I need to inject the AuthService to authenticate the user
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Here I will get the profile of my user
    // As my guard check that the user (user$) exists
    // I can access directly to my user$ instead of reviewing the profile again
    // here we will replace .getProfile() for .user$
    this.authService.user$.subscribe((data) => {
      this.user = data;
    });
  }

  isAdminRole(): boolean {
    return this.user?.roles.includes("ROLE_ADMIN") ?? false
  }

  isCustomerRole(): boolean {
    return this.user?.roles.includes("ROLE_CUSTOMER") ?? false
  }
}
