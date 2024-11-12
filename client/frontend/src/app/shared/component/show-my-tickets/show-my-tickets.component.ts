import { Component, OnInit } from '@angular/core';
import { ShowMyTicketsService } from '../../../core/services/show-my-tickets.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-my-tickets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-my-tickets.component.html',
  styleUrls: ['./show-my-tickets.component.css'],
})
export class ShowMyTicketsComponent implements OnInit {
  tickets: any[] = [];

  constructor(private showMyTicketsService: ShowMyTicketsService) {}

  ngOnInit(): void {
    const userId = 'user-id'; // Replace with logic to fetch the current user ID
    this.loadMyTickets(userId);
  }

  loadMyTickets(userId: string): void {
    this.showMyTicketsService.getMyTickets(userId).subscribe(
      (response) => {
        this.tickets = response; // Adjust this if your response structure is different
      },
      (error) => {
        console.error('Failed to load tickets:', error);
      }
    );
  }
}
