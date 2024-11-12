import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SignInService } from '../../core/services/sign-in.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit, OnDestroy {
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl(false),
  });

  private signInSubscription: Subscription | null = null; // Initialize as null
  signInState: any;

  get email() {
    return this.signInForm.get('email');
  }
  get password() {
    return this.signInForm.get('password');
  }
  get rememberMe() {
    return this.signInForm.get('rememberMe');
  }

  constructor(private signInService: SignInService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to the sign-in state
    this.signInSubscription = this.signInService
      .getSignInState()
      .subscribe((state) => {
        if (state) {
          this.signInState = state;
          // Navigate based on the user role after successful sign-in
          if (state.user) {
            const role = state.user.role;
            if (role === 'Customer') {
              this.router.navigate(['/home']);
            } else if (role === 'Support' || role === 'Admin') {
              this.router.navigate(['/agentconsole']);
            }
          }
        }
      });
  }

  async onSubmit(): Promise<void> {
    console.log('Form submission triggered');
    console.log('Form Valid:', this.signInForm.valid);
    console.log('Form Value:', this.signInForm.value);

    if (this.signInForm.valid) {
      try {
        // If the form is valid, sign in the user
        await this.signInService.signIn(this.signInForm.value);
      } catch (error) {
        console.error('Sign-in error', error as Error); // Type assertion to Error
        alert(
          `Sign-in failed: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        );
      }
    } else {
      // If form is invalid, trigger form validation
      this.signInForm.markAllAsTouched(); // Mark all controls as touched to show validation messages
      console.log('Form is invalid');
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.signInSubscription) {
      this.signInSubscription.unsubscribe();
    }
  }
}
