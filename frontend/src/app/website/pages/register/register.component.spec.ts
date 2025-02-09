import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { AuthService } from '../../../services/auth.service';
import { ClientService } from '../../../services/client.service';
import { TokenService } from '../../../services/token.service';
import { UsersService } from '../../../services/users.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreService } from '../../../services/store.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule], // ✅ FIX: Add HttpClientTestingModule and ReactiveFormsModule
      providers: [
        AuthService,
        ClientService,
        TokenService,
        StoreService,
        UsersService
      ],
    });
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
