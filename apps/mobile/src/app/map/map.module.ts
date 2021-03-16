import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map.component';
import { MapViewComponent } from './components/map-view/map-view.component';


const routes: Routes = [
  { path: '', component: MapComponent }
];

@NgModule({
  declarations: [MapComponent, MapViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MapModule { }
