import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SignInService } from '../../services/sign-in.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl(false),
  });

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

  async onSubmit(): Promise<void> {
    if (this.signInForm.valid) {
      try {
        const response = await this.signInService.signIn(this.signInForm.value);
        console.log('Sign-in successful', response);

        // Navigate based on the user role (if applicable)
        if (response.user.role === 'Customer') {
          this.router.navigate(['/home']);
        } else if (response.user.role === 'Support') {
          this.router.navigate(['/agentconsole']);
        }
      } catch (error: any) {
        console.error('Sign-in error', error);
        alert(
          `Sign-in failed: ${error.response?.data?.message || error.message}`
        );
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
