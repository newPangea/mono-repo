import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';

import { CoreModule } from '@pang/core';
import { ResourcesModule } from '@pang/mobile/app/shared/resources/resources.module';
import { SharedModule } from '@pang/mobile/app/shared/shared.module';
import { UiModule } from '@pang/ui';

import { ProfileComponent } from './components/profile/profile.component';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserComponent, ProfileComponent],
  imports: [
    CommonModule,
    CoreModule,
    MatButtonModule,
    MatIconModule,
    ResourcesModule,
    SharedModule,
    UiModule,
    UserRoutingModule,
  ],
})
export class UserModule {}
