import { Routes } from '@angular/router';

import { ListOfItemsComponent } from './pages/list-of-items/list-of-items.component';
import { UpdateRequestComponent } from './pages/update-request/update-request.component';

import { ModelComponent } from './component/model/model.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AgentConsoleComponent } from './pages/agent-console/agent-console.component';

export const routes: Routes = [
  // localhost:4200/
  { path: '', component: SignUpComponent },
  // localhost:4200/explore
  { path: 'signin', component: SignInComponent },
  // localhost:4200/news
  { path: 'home', component: HomeComponent },

  { path: 'agentconsole', component: AgentConsoleComponent },
  { path: 'listofitems', component: ListOfItemsComponent },

  { path: 'updateConsole', component: UpdateRequestComponent },
  { path: 'model', component: ModelComponent },

  // Wildcard component y3ny ay 7aga 8er ale fw2 dwl
  { path: '**', component: PageNotFoundComponent },
];
