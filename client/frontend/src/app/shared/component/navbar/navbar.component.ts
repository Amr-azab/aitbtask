import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}
  logout(): void {
    this.authService.clearToken(); // Clear the token
    this.router.navigate(['/signin']);
  } // Navigate to sign-in page
}
