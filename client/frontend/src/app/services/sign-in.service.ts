import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  private apiUrl = 'http://localhost:8000/api/aitb/user';
  private signInState = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService, private http: HttpClient) {}

  getSignInState(): Observable<any> {
    return this.signInState.asObservable();
  }

  signIn(data: any): void {
    this.http.post(`${this.apiUrl}/signin`, data).subscribe(
      (response: any) => {
        this.authService.saveToken(response.token); // Save the token
        this.signInState.next(response); // Update the sign-in state
      },
      (error) => {
        this.signInState.next({
          error: error.error?.message || error.message,
        });
        throw new Error(
          `Sign-in error: ${error.error?.message || error.message}`
        );
      }
    );
  }
}
