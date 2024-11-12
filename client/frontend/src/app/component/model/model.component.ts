import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModelService } from '../../services/model.service';

@Component({
  selector: 'app-model',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css'],
})
export class ModelComponent implements OnInit {
  @Input() itemId!: string;
  createTicketForm: FormGroup;
  user: any = {};

  constructor(private fb: FormBuilder, private modelService: ModelService) {
    this.createTicketForm = this.fb.group({
      email: [{ value: '', disabled: true }],
      phone: [{ value: '', disabled: true }],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.modelService.getMe().subscribe(
      (response: any) => {
        this.user = response.user;
        this.createTicketForm.patchValue({
          email: this.user.email,
          phone: this.user.phone,
        });
      },
      (error: any) => {
        console.error('Failed to load user data:', error);
      }
    );
  }

  createTicket(): void {
    const description = this.createTicketForm.get('description')?.value;
    this.modelService.createTicket(this.itemId, description).subscribe(
      (response: any) => {
        alert('Ticket created successfully');
        this.closeModal();
      },
      (error: any) => {
        console.error('Failed to create ticket:', error);
        alert('Failed to create ticket');
      }
    );
  }

  closeModal(): void {
    const modal = document.getElementById('createTicketModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
}
