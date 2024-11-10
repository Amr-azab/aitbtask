import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SignUpService } from '../../services/sign-up.service';
import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SignInComponent, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  contactForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
  });

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

  async onUserSubmit(): Promise<void> {
    if (this.contactForm.valid) {
      try {
        const response = await this.signUpService.signUp({
          username: this.contactForm.value.username,
          email: this.contactForm.value.email,
          password: this.contactForm.value.password,
          phone: this.contactForm.value.phoneNumber, // Ensure this field matches the backend validation
          role: this.contactForm.value.role,
        });
        console.log('Sign-up successful', response);
        const role = this.contactForm.value.role;
        if (role === 'Customer') {
          this.router.navigate(['/home']);
        } else if (role === 'Support') {
          this.router.navigate(['/agentconsole']);
        }
      } catch (error: any) {
        console.error('Sign-up error', error);
        alert(
          `Sign-up failed: ${error.response?.data?.message || error.message}`
        );
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
