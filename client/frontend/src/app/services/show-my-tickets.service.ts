import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShowMyTicketsService {
  private apiUrl = 'http://localhost:8000/api/aitb/ticket/mytickets'; // Update with the correct backend URL

  constructor(private http: HttpClient) {}

  getMyTickets(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    return this.http.get<any>(`${this.apiUrl}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  }
}
