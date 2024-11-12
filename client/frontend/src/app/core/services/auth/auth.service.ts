import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authState = new BehaviorSubject<boolean>(this.hasToken());
  private tokenKey = 'token';

  constructor(private router: Router) {
    this.checkToken();
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.authState.next(true);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.authState.next(false);
    this.router.navigate(['/signin']);
  }

  hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getAuthState(): Observable<boolean> {
    return this.authState.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private checkToken(): void {
    const token = this.getToken();
    if (token) {
      this.authState.next(true);
    } else {
      this.authState.next(false);
      this.router.navigate(['/signin']);
    }
  }
}
