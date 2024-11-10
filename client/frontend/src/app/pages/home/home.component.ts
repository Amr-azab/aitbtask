import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../component/navbar/navbar.component';
import { IconFieldComponent } from '../../component/icon-field/icon-field.component';
import { HomeService } from '../../services/home.service';
import { ShowMyTicketsComponent } from '../../component/show-my-tickets/show-my-tickets.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    NavbarComponent,
    IconFieldComponent,
    ShowMyTicketsComponent,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  username: string = '';

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.homeService.getUserData().subscribe(
      (user) => {
        this.username = user.username; // Ensure we are getting the username correctly
      },
      (error) => {
        console.error('Failed to load user data:', error);
        this.username = 'Guest'; // Default to 'Guest' if user data loading fails
      }
    );
  }
}
