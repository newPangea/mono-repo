import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from '@pang/mobile/app/shared/shared.module';
import { UiModule } from '@pang/ui';

import { AddResourceComponent } from './components/add-resource/add-resource.component';
import { ResourcesComponent } from './resources.component';
import { MatRadioModule } from '@angular/material/radio';
import { ViewFilesComponent } from './components/view-files/view-files.component';

@NgModule({
  declarations: [ResourcesComponent, AddResourceComponent, ViewFilesComponent],
  exports: [ResourcesComponent],
  imports: [
    CommonModule,
    IonicModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    SharedModule,
    UiModule,
    MatRadioModule,
    FormsModule,
  ],
})
export class ResourcesModule {}
