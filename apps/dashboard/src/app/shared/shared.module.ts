import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SidebarMenuComponent],
  imports: [CommonModule, MatSidenavModule, MatIconModule],
  exports: [SidebarMenuComponent],
})
export class SharedModule {}
