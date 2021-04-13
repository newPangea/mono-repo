import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

import { AlgoliaModule } from '@pang/algolia';
import { SharedModule } from '@pang/mobile/app/shared/shared.module';
import { UiModule } from '@pang/ui';

import { AddResourceComponent } from './components/add-resource/add-resource.component';
import { FilterResourcePipe } from './pipe/filter-resource.pipe';
import { ItemResourceComponent } from './components/item-resource/item-resource.component';
import { ResourcesComponent } from './resources.component';
import { ViewFilesComponent } from './components/view-files/view-files.component';

@NgModule({
  declarations: [
    AddResourceComponent,
    FilterResourcePipe,
    ItemResourceComponent,
    ResourcesComponent,
    ViewFilesComponent,
  ],
  exports: [ResourcesComponent],
  imports: [
    AlgoliaModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatRippleModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    SharedModule,
    UiModule,
  ],
  providers: [PreviewAnyFile, PhotoViewer],
})
export class ResourcesModule {}
