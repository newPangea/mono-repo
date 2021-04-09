import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';

import { CoreModule } from '@pang/core';
import { UiModule } from '@pang/ui';

import { SharedModule } from '../../../shared/shared.module';
import { CommunityComponent } from './community.component';
import { CommunityRoutingModule } from './community-routing.module';

@NgModule({
  declarations: [CommunityComponent],
  imports: [
    CommonModule,
    CoreModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
    UiModule,
    CommunityRoutingModule,
  ],
})
export class CommunityModule {}
