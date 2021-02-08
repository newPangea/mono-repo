import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SidebarMenuComponent } from '../../common-components/sidebar-menu/sidebar-menu.component';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
    declarations: [SidebarMenuComponent],
    imports: [CommonModule, DashboardRoutingModule,],
})

export class AdminModule {}