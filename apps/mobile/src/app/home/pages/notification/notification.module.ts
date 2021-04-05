import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification.component';
import { UiModule } from '@pang/ui';
import { MatButtonModule } from '@angular/material/button';
import { ConnectionCardComponent } from './components/connection-card/connection-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [NotificationComponent, ConnectionCardComponent],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    UiModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class NotificationModule {}
