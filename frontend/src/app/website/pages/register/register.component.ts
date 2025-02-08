import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { OnExit } from 'src/app/guards/exit.guard';
import { Client } from 'src/app/models/client.model';
import { CreateUserDTO, LoginAuth, LoginUser, User } from 'src/app/models/user.model';
import { AuthService } from '../../../services/auth.service';
import { ClientService } from '../../../services/client.service';
import { StoreService } from '../../../services/store.service';
import { TokenService } from '../../../services/token.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnExit {
  signupForm: FormGroup;
  step = 1; // Step tracker
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private userService: UsersService,
    private authService: AuthService,
    private tokenService: TokenService,
    private storeService: StoreService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      id: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      cellphone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  nextStep() {
    if (
      this.signupForm.get('id')?.valid &&
      this.signupForm.get('firstname')?.valid &&
      this.signupForm.get('lastname')?.valid &&
      this.signupForm.get('cellphone')?.valid &&
      this.signupForm.get('address')?.valid &&
      this.signupForm.get('email')?.valid
    ) {
      this.step = 2;
    } else {
      this.errorMessage = 'Please complete all fields correctly.';
    }
  }

  previousStep() {
    this.step = 1;
  }

  submit() {
    if (this.signupForm.valid) {
      console.log('User Data:', this.signupForm.value);
      const clientData: Client = {
        clientId: String(this.signupForm.value.id),
        firstName: String(this.signupForm.value.firstname),
        lastName: String(this.signupForm.value.lastname),
        cellPhone: Number(this.signupForm.value.cellphone),
        address: String(this.signupForm.value.address),
        email: String(this.signupForm.value.email),
      };

      const credentials: CreateUserDTO = {
        name: String(this.signupForm.value.email),
        username: String(this.signupForm.value.username),
        password: String(this.signupForm.value.password),
      };

      this.userService
        .createCustomer(credentials)
        .pipe(
          // Once registration is successful, proceed to login
          switchMap((registerResponse: User) => {
            const loginUser: LoginUser = {
              username: registerResponse.username,
              password: credentials.password,
            };
            return this.authService.login(loginUser);
          }),

          // Once logged in, create the client
          switchMap((loginResponse: any) => {
            return this.clientService.createAClient(clientData);
          }),

          // Remove the token from Cookies
          switchMap((clientResponse: Client) => {
            return of(this.tokenService.removeToken());
          }),

          catchError((error) => {
            this.errorMessage = `Something went wrong!`;
            return of(null); // Return an observable that won't break the chain
          })
        )
        .subscribe({
          next: () => {
            this.router.navigate(['/login']);
            alert('Signup Successful!');
          },
        });
    }
  }

  // Let's implement the interface OnExit() here
  // and implement the logic here (use confirm())
  onExit() {
    if (!this.signupForm.valid) {
      const rta = confirm('Are you sure to leave this page?');
      return rta;
    }
    return true
  }
}
