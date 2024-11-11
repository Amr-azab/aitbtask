import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../services/viewticket.service'; // Correct the service import

@Component({
  selector: 'app-viewticket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewticket.component.html',
  styleUrls: ['./viewticket.component.css'],
})
export class ViewticketComponent implements OnInit {
  tickets: any[] = [];

  constructor(private viewticketService: TicketService) {} // Correct the service injection

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.viewticketService.getAllTickets().subscribe(
      // Correct the method name
      (response: any) => {
        this.tickets = response; // Adjust this if your response structure is different
      },
      (error: any) => {
        console.error('Failed to load tickets:', error);
      }
    );
  }
}
