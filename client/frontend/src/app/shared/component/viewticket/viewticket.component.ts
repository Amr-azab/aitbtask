import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../../core/services/viewticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewticket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewticket.component.html',
  styleUrls: ['./viewticket.component.css'],
})
export class ViewticketComponent implements OnInit {
  tickets: any[] = [];

  constructor(
    private viewticketService: TicketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.viewticketService.getAllTickets().subscribe(
      (response: any) => {
        this.tickets = response;
      },
      (error: any) => {
        console.error('Failed to load tickets:', error);
      }
    );
  }

  navigateToUpdateRequest(ticketId: string): void {
    this.router.navigate(['agentconsole/updateConsole', ticketId]);
  }
}
