import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  private apiUrl = 'http://localhost:8000/api/aitb/ticket/create-ticket'; // Base URL for ticket creation
  private userApiUrl = 'http://localhost:8000/api/aitb/user/getMe'; // API URL for getMe function

  constructor(private http: HttpClient) {}

  getMe(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    return this.http.get<any>(this.userApiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  }

  createTicket(itemId: string, ticketData: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const url = `${this.apiUrl}/${itemId}`;
    return this.http.post<any>(url, ticketData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  }
}
