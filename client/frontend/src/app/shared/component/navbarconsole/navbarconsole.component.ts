import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbarconsole',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbarconsole.component.html',
  styleUrl: './navbarconsole.component.css',
})
export class NavbarconsoleComponent {
  constructor(private authService: AuthService, private router: Router) {}
  logout(): void {
    this.authService.clearToken(); // Clear the token
    this.router.navigate(['/signin']);
  } // Navigate to sign-in page
}
