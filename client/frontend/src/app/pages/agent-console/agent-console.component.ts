import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ListOfItemsComponent } from '../list-of-items/list-of-items.component';
import { NavbarconsoleComponent } from '../../component/navbarconsole/navbarconsole.component';
import { NavbarverticalComponent } from '../../component/navbarvertical/navbarvertical.component';
import { ViewticketComponent } from '../../component/viewticket/viewticket.component';

@Component({
  selector: 'app-agent-console',
  standalone: true,
  imports: [
    CommonModule,
    ListOfItemsComponent,
    NavbarconsoleComponent,
    NavbarverticalComponent,
    ViewticketComponent,
  ],
  templateUrl: './agent-console.component.html',
  styleUrl: './agent-console.component.css',
})
export class AgentConsoleComponent {}
