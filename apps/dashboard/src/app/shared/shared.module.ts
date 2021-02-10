import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [SidebarMenuComponent],
  imports: [CommonModule, MatSidenavModule, MatIconModule, MatInputModule, ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC9aRHf8SS9ZQ2kLESnX1RqJmbxFmkYZco&libraries=places',
    })
  ],
  exports: [SidebarMenuComponent],
})
export class SharedModule {}
