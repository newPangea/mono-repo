import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { UsersComponent } from './components/users/users.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: 'schools',
    component: DashboardComponent,
  },
  {
    path: 'preferences',
    component: PreferencesComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class DashboardRoutingModule {}
