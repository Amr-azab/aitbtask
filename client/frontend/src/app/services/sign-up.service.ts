import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  private apiUrl = 'http://localhost:8000/api/customer'; // Replace with your backend URL

  constructor() {}

  async signUp(data: any): Promise<void> {
    try {
      const response = await axios.post(`${this.apiUrl}/signup`, data);
      return response.data; // Ensure it returns data as per your need
    } catch (error: any) {
      throw new Error(
        `Sign-up error: ${error.response?.data?.message || error.message}`
      );
    }
  }
}
