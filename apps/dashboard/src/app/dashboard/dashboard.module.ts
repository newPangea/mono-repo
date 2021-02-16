import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'dashboard/app/shared/shared.module';
import { CoreModule } from '@pang/core';
import { DashboardComponent } from './dashboard.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, CoreModule, MatSnackBarModule],
})
export class AdminModule {}
