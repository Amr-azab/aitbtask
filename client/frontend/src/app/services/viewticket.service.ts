import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  // Ensure the class name is TicketService
  private apiUrl = 'http://localhost:8000/api/aitb/ticket/alltickets'; // Update with your API endpoint

  constructor(private http: HttpClient) {}

  getAllTickets(): Observable<any> {
    // Ensure the method name is getAllTickets
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    return this.http.get<any>(this.apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  }
}
