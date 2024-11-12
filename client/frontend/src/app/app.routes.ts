import { Routes } from '@angular/router';
import { SignUpComponent } from './Modules/sign-up/sign-up.component';
import { SignInComponent } from './Modules/sign-in/sign-in.component';
import { HomeComponent } from './Modules/home/home.component';
import { AgentConsoleComponent } from './Modules/agent-console/agent-console.component';
import { ListOfItemsComponent } from './Modules/list-of-items/list-of-items.component';
import { UpdateRequestComponent } from './Modules/update-request/update-request.component';
import { ModelComponent } from './shared/component/model/model.component';
import { PageNotFoundComponent } from './Modules/page-not-found/page-not-found.component';
import { AuthGuard } from './core/services/auth/auth.guard';
import { ViewticketComponent } from './shared/component/viewticket/viewticket.component';

export const routes: Routes = [
  { path: '', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'agentconsole',
    component: AgentConsoleComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ViewticketComponent }, // Ensure this is set as the default
      { path: 'updateConsole/:ticketId', component: UpdateRequestComponent },
    ],
  },
  {
    path: 'listofitems',
    component: ListOfItemsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'model', component: ModelComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent },
];
