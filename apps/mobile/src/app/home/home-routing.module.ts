import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'notification',
    loadChildren: () =>
      import('./pages/notification/notification.module').then((m) => m.NotificationModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
