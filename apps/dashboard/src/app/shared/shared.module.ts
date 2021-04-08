import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreModule } from '@pang/core';
import { UiModule } from '@pang/ui';

import { AgmCoreModule } from '@agm/core';

import { PreferencesComponent } from '../dashboard/components/preferences/preferences.component';
import { SchoolsComponent } from '../dashboard/components/schools/schools.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { UserComponent } from '../dashboard/components/user/user.component';
import { UsersComponent } from '../dashboard/components/users/users.component';

@NgModule({
  declarations: [
    SidebarMenuComponent,
    SchoolsComponent,
    PreferencesComponent,
    UsersComponent,
    UserComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC9aRHf8SS9ZQ2kLESnX1RqJmbxFmkYZco&libraries=places',
    }),
    CommonModule,
    CoreModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTableModule,
    ReactiveFormsModule,
    RouterModule,
    UiModule,
  ],
  exports: [SidebarMenuComponent, SchoolsComponent, PreferencesComponent],
})
export class SharedModule {}
