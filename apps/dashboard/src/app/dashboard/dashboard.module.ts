import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'dashboard/app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class AdminModule {}
