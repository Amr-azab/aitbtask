import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './Modules/home/home.component';
import { PageNotFoundComponent } from './Modules/page-not-found/page-not-found.component';
import { SignInComponent } from './Modules/sign-in/sign-in.component';
import { SignUpComponent } from './Modules/sign-up/sign-up.component';
import { UpdateRequestComponent } from './Modules/update-request/update-request.component';
import { ListOfItemsComponent } from './Modules/list-of-items/list-of-items.component';
import { ModelComponent } from './shared/component/model/model.component';

import { NavbarComponent } from './shared/component/navbar/navbar.component';
import { AgentConsoleComponent } from './Modules/agent-console/agent-console.component';
import { NavbarconsoleComponent } from './shared/component/navbarconsole/navbarconsole.component';
import { NavbarverticalComponent } from './shared/component/navbarvertical/navbarvertical.component';
import { ViewticketComponent } from './shared/component/viewticket/viewticket.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HomeComponent,
    PageNotFoundComponent,
    SignInComponent,
    SignUpComponent,
    UpdateRequestComponent,
    ListOfItemsComponent,
    ModelComponent,
    NavbarComponent,
    AgentConsoleComponent,
    NavbarconsoleComponent,
    NavbarverticalComponent,
    ViewticketComponent,

    ModelComponent,
    FormsModule,
    NgbModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Ensure styleUrls is correctly written
})
export class AppComponent {
  title = 'frontend';
}
