import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GlobeComponent } from './globe.component';


const routes: Routes = [
  { path: '', component: GlobeComponent }
];

@NgModule({
  declarations: [GlobeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class GlobeModule { }
