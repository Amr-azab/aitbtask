import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
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

  onUserSubmit(): void {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
