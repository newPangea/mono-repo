import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UiModule } from '@pang/ui';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CoreModule } from '@pang/core';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    UiModule,
    MatIconModule,
    MatButtonModule,
    CoreModule,
    SharedModule,
  ],
})
export class UserModule {}
