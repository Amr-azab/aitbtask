import { Component } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-icon-field',
  standalone: true,
  imports: [IconFieldModule, InputIconModule, InputTextModule, FormsModule],
  templateUrl: './icon-field.component.html',
  styleUrls: ['./icon-field.component.css'],
})
export class IconFieldComponent {}
