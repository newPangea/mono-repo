import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { UiModule } from '@pang/ui';
import { FormsModule } from '@angular/forms';
import { GlobeComponent } from './components/globe/globe.component';
import { IonicModule } from '@ionic/angular';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent, GlobeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatIconModule,
    UiModule,
    FormsModule,
    IonicModule,
    MatProgressBarModule,
    MatSnackBarModule,
    SharedModule,
  ],
})
export class HomeModule {}
