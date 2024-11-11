import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UpdateRequestService } from '../../services/update-request.service';

@Component({
  selector: 'app-update-request',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-request.component.html',
  styleUrls: ['./update-request.component.css'],
})
export class UpdateRequestComponent implements OnInit {
  ticketForm: FormGroup;
  ticketId!: string;

  constructor(
    private route: ActivatedRoute,
    private updateRequestService: UpdateRequestService,
    private fb: FormBuilder
  ) {
    this.ticketForm = this.fb.group({
      guiId: [{ value: '', disabled: true }],
      username: [{ value: '', disabled: true }],
      phone: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      status: [''],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.ticketId = this.route.snapshot.paramMap.get('ticketId')!;
    this.loadTicket();
  }

  loadTicket(): void {
    this.updateRequestService
      .getTicket(this.ticketId)
      .subscribe((ticket: any) => {
        this.ticketForm.patchValue({
          guiId: ticket.ticket.guiId,
          username: ticket.ticket.username,
          phone: ticket.ticket.phone,
          email: ticket.ticket.email,
          status: ticket.ticket.status,
          description: ticket.ticket.description,
        });
      });
  }

  updateTicket(): void {
    const updatedData = {
      status: this.ticketForm.get('status')!.value,
      description: this.ticketForm.get('description')!.value,
    };

    this.updateRequestService
      .updateTicket(this.ticketId, updatedData)
      .subscribe(() => {
        alert('Ticket updated successfully');
        this.loadTicket(); // Reload ticket details after update
      });
  }
}
