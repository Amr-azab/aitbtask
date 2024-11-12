import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOfItemsComponent } from '../list-of-items/list-of-items.component';
import { NavbarconsoleComponent } from '../../shared/component/navbarconsole/navbarconsole.component';
import { NavbarverticalComponent } from '../../shared/component/navbarvertical/navbarvertical.component';
import { ViewticketComponent } from '../../shared/component/viewticket/viewticket.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-agent-console',
  standalone: true,
  imports: [
    CommonModule,
    ListOfItemsComponent,
    NavbarconsoleComponent,
    NavbarverticalComponent,
    ViewticketComponent,
    RouterModule,
  ],
  templateUrl: './agent-console.component.html',
  styleUrls: ['./agent-console.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AgentConsoleComponent {}
