import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PreferenceComponent } from './preference.component';


const routes: Routes = [
  { path: '', component: PreferenceComponent }
];

@NgModule({
  declarations: [PreferenceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PreferenceModule { }
