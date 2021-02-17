import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SchoolsComponent } from '../dashboard/components/schools/schools.component';
import { PreferencesComponent } from '../dashboard/components/preferences/preferences.component';
import { UiModule } from '@pang/ui';
import { UsersComponent } from '../dashboard/components/users/users.component';
import { CoreModule } from '@pang/core';

@NgModule({
  declarations: [SidebarMenuComponent, SchoolsComponent, PreferencesComponent, UsersComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC9aRHf8SS9ZQ2kLESnX1RqJmbxFmkYZco&libraries=places',
    }),
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatProgressBarModule,
    UiModule,
    CoreModule
  ],
  exports: [SidebarMenuComponent, SchoolsComponent, PreferencesComponent],
})
export class SharedModule {}
