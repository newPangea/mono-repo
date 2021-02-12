import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'dashboard/app/shared/shared.module';
import { CoreModule } from '@pang/core';

@NgModule({
  declarations: [],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, CoreModule],
})
export class AdminModule {}
