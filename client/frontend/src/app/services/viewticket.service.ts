import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private apiUrl = 'http://localhost:8000/api/aitb/ticket'; // Update with your API endpoint

  constructor(private http: HttpClient) {}

  getAllTickets(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    return this.http.get<any>(`${this.apiUrl}/alltickets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  }

  getTicket(ticketId: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    return this.http.get<any>(`${this.apiUrl}/request-ticket/${ticketId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  }
}
