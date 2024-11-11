import { Routes } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { HomeComponent } from './pages/home/home.component';
import { AgentConsoleComponent } from './pages/agent-console/agent-console.component';
import { ListOfItemsComponent } from './pages/list-of-items/list-of-items.component';
import { UpdateRequestComponent } from './pages/update-request/update-request.component';
import { ModelComponent } from './component/model/model.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';
import { ViewticketComponent } from './component/viewticket/viewticket.component';

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
