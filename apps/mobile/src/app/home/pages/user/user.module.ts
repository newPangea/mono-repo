import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';

import { CoreModule } from '@pang/core';
import { UiModule } from '@pang/ui';

import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    CoreModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
    UiModule,
    UserRoutingModule,
  ],
})
export class UserModule {}
