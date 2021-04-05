import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { SharedModule } from '../shared/shared.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

const routes: Routes = [{ path: '', component: MapComponent }];

@NgModule({
  declarations: [MapComponent, MapViewComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatSnackBarModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC9aRHf8SS9ZQ2kLESnX1RqJmbxFmkYZco&libraries=places',
    }),
    AgmJsMarkerClustererModule,
    MatBottomSheetModule,
  ],
})
export class MapModule {}
