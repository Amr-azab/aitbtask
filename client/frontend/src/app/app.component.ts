import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateRequestComponent } from './pages/update-request/update-request.component';

import { ListOfItemsComponent } from './pages/list-of-items/list-of-items.component';
import { ModelComponent } from './component/model/model.component';
import { IconFieldComponent } from './component/icon-field/icon-field.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AgentConsoleComponent } from './pages/agent-console/agent-console.component';
import { NavbarconsoleComponent } from './component/navbarconsole/navbarconsole.component';
import { NavbarverticalComponent } from './component/navbarvertical/navbarvertical.component';
import { ViewticketComponent } from './component/viewticket/viewticket.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    HomeComponent,
    PageNotFoundComponent,
    SignInComponent,
    SignUpComponent,
    ReactiveFormsModule,
    FormsModule,
    UpdateRequestComponent,
    AgentConsoleComponent,
    ListOfItemsComponent,
    ModelComponent,
    IconFieldComponent,
    NavbarComponent,
    NavbarconsoleComponent,
    NavbarverticalComponent,
    ViewticketComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
}