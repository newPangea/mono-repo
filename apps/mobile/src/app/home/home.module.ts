import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SearchComponent } from './components/search/search.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { UserSearchResultComponent } from './components/user-search-result/user-search-result.component';
import { UiModule } from '@pang/ui';
import { FormsModule } from '@angular/forms';
import { SchoolSearchResultComponent } from './components/school-search-result/school-search-result.component';
import { GlobeComponent } from './components/globe/globe.component';
import { IonicModule } from '@ionic/angular';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BottomMenuComponent } from './components/bottom-menu/bottom-menu.component';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [
    HomeComponent,
    SearchComponent,
    UserSearchResultComponent,
    SchoolSearchResultComponent,
    GlobeComponent,
    BottomMenuComponent,
  ],
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
    MatSnackBarModule
  ],
})
export class HomeModule {}
