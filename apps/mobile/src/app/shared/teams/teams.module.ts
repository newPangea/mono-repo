import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from '@pang/mobile/app/shared/shared.module';
import { UiModule } from '@pang/ui';

import { TeamsComponent } from './teams.component';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { TeamComponent } from './components/team/team.component';
import { ResourcesModule } from '../resources/resources.module';

@NgModule({
  declarations: [TeamsComponent, CreateTeamComponent, TeamComponent],
  exports: [TeamsComponent, CreateTeamComponent],
  imports: [
    CommonModule,
    IonicModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    ResourcesModule,
    SharedModule,
    UiModule,
  ],
})
export class TeamsModule {}
