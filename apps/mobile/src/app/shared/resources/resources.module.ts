import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgModule } from '@angular/core';

import { LoadingController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';

import { AlgoliaModule } from '@pang/algolia';
import { SharedModule } from '@pang/mobile/app/shared/shared.module';
import { UiModule } from '@pang/ui';

import { AddResourceComponent } from './components/add-resource/add-resource.component';
import { FilterResourcePipe } from './pipe/filter-resource.pipe';
import { ItemResourceComponent } from './components/item-resource/item-resource.component';
import { OptionResourceComponent } from './components/option-resource/option-resource.component';
import { ResourcesComponent } from './resources.component';
import { ViewFilesComponent } from './components/view-files/view-files.component';

@NgModule({
  declarations: [
    AddResourceComponent,
    FilterResourcePipe,
    ItemResourceComponent,
    OptionResourceComponent,
    ResourcesComponent,
    ViewFilesComponent,
  ],
  exports: [ResourcesComponent],
  imports: [
    AlgoliaModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MatBottomSheetModule,
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
  providers: [PreviewAnyFile, LoadingController],
})
export class ResourcesModule {}
