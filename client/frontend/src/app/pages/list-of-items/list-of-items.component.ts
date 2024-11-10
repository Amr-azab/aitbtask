import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../component/navbar/navbar.component';
import { ListOfItemsService } from '../../services/list-of-items.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-of-items',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './list-of-items.component.html',
  styleUrls: ['./list-of-items.component.css'],
})
export class ListOfItemsComponent implements OnInit {
  items: any[] = [];

  constructor(private listOfItemsService: ListOfItemsService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.listOfItemsService.getAllItems().subscribe(
      (response) => {
        this.items = response.items;
      },
      (error) => {
        console.error('Failed to load items:', error);
      }
    );
  }

  getImageUrl(photo: string): string {
    return photo ? `http://localhost:8000${photo}` : 'default-image-path.jpg';
  }
}
