import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, map, Observable } from 'rxjs';
import { OnExit } from 'src/app/guards/exit.guard';
import { Client } from 'src/app/models/client.model';
import { CreateUserDTO, User } from 'src/app/models/user.model';
import { ClientService } from 'src/app/services/client.service';
import { UsersService } from 'src/app/services/users.service';

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
        clientId: String(this.signupForm.value.clientId),
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

      forkJoin({
        clientResponse: this.clientService.createAClient(clientData),
        userResponse: this.userService.createCustomer(credentials),
      }).subscribe({
        next: () => {
          this.router.navigate(['/login']);
          alert('Signup Successful!');
        },
        error: (err) => {
          this.errorMessage = `Something went wrong!`;
        },
      });
    }
  }

  // Let's implement the interface OnExit() here
  // and implement the logic here (use confirm())
  onExit() {
    const rta = confirm('Are you sure to leave this page?');
    return rta;
  }
}
