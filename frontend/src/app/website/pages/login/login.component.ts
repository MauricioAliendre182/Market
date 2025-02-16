import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, switchMap, throwError } from 'rxjs';
import { Client } from 'src/app/models/client.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from '../../../services/auth.service';
import { ClientService } from '../../../services/client.service';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';
  profile: User | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storeService: StoreService,
    private clientService: ClientService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.loginAndGet({ username, password }).pipe(
        switchMap((profile: User) => {
          this.profile = profile;
          // Store the profile's name
          this.storeService.storeName(profile);
          // Store the profile's role
          this.storeService.storeRole(profile);
          return this.clientService.getAClientByEmail(profile.username);
        })
      ).subscribe({
        next: (client: Client) => {
          this.storeService.storeClientId(client);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.errorMessage = 'Invalid username or password';
          console.error(`The error is: ${err}`)
        },
      });
    }
  }
}
