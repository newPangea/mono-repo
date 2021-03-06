import { CommonModule } from '@angular/common';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

import { environment } from '@pang/mobile/environments/environment';

import { MapComponent } from './map.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{ path: '', component: MapComponent }];

@NgModule({
  declarations: [MapComponent, MapViewComponent],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.agmapKey,
    }),
    AgmJsMarkerClustererModule,
    CommonModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class MapModule {}
