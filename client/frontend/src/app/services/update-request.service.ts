import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateRequestService {
  private apiUrl = 'http://localhost:8000/api/aitb/ticket'; // Update with your API endpoint

  constructor(private http: HttpClient) {}

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

  updateTicket(ticketId: string, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    return this.http.patch<any>(
      `${this.apiUrl}/${ticketId}/update-tickets`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
  }
}
