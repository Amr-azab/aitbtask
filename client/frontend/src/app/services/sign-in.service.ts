import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  private apiUrl = 'http://localhost:8000/api/customer'; // Replace with your backend URL

  constructor() {}

  async signIn(data: any): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/signin`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Sign-in error: ${error.response?.data?.message || error.message}`
      );
    }
  }
}
