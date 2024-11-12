import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  private apiUrl = 'http://localhost:8000/api/aitb/user';
  private signUpState = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService, private http: HttpClient) {}

  getSignUpState(): Observable<any> {
    return this.signUpState.asObservable();
  }

  signUp(data: any): void {
    this.http.post(`${this.apiUrl}/signup`, data).subscribe(
      (response: any) => {
        this.authService.saveToken(response.token); // Save the token
        this.signUpState.next(response); // Update the sign-up state
      },
      (error) => {
        this.signUpState.next({
          error: error.error?.message || error.message,
        });
        throw new Error(
          `Sign-up error: ${error.error?.message || error.message}`
        );
      }
    );
  }
}
