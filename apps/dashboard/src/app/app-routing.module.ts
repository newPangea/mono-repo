import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
    {
      path: '',
      component: LoginComponent,
      //canActivate: [NotLoggedGuard],
    },
    {
      path: 'dashboard',
      component: DashboardComponent
      //canActivate: [AuthGuard],
    },
    {
      path: '**',
      redirectTo: '',
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}