import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SignUpService } from '../../core/services/sign-up.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  contactForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [
      Validators.required,
      this.phoneNumberValidator,
    ]),
    role: new FormControl('', Validators.required),
  });

  private signUpSubscription: Subscription | null = null;
  signUpState: any;

  get username() {
    return this.contactForm.get('username');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get password() {
    return this.contactForm.get('password');
  }
  get phoneNumber() {
    return this.contactForm.get('phoneNumber');
  }
  get role() {
    return this.contactForm.get('role');
  }

  constructor(private signUpService: SignUpService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to the sign-up state
    this.signUpSubscription = this.signUpService
      .getSignUpState()
      .subscribe((state) => {
        if (state) {
          this.signUpState = state;
          // Navigate based on the user role after successful sign-up
          if (state.user) {
            const role = state.user.role;
            if (role === 'Customer') {
              this.router.navigate(['/home']);
            } else if (role === 'Support') {
              this.router.navigate(['/agentconsole']);
            }
          }
        }
      });
  }

  // Custom phone number validator
  phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
    const phone = control.value;
    if (!phone) return null;

    // Check if phone starts with "0"
    if (!phone.startsWith('0')) {
      return { startWithZero: true };
    }

    // Check if phone is exactly 11 digits
    if (phone.length !== 11) {
      return { lengthInvalid: true };
    }

    return null;
  }

  async onUserSubmit(): Promise<void> {
    this.contactForm.markAllAsTouched();
    if (this.contactForm.valid) {
      try {
        await this.signUpService.signUp({
          username: this.contactForm.value.username,
          email: this.contactForm.value.email,
          password: this.contactForm.value.password,
          phone: this.contactForm.value.phoneNumber,
          role: this.contactForm.value.role,
        });
      } catch (error) {
        console.error('Sign-up error', error);
      }
    } else {
      console.log('Form is invalid');
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.signUpSubscription) {
      this.signUpSubscription.unsubscribe();
    }
  }
}
