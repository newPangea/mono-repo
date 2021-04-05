import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomMenuComponent } from './components/bottom-menu/bottom-menu.component';
import { SearchComponent } from './components/search/search.component';
import { UserSearchResultComponent } from './components/user-search-result/user-search-result.component';
import { SchoolSearchResultComponent } from './components/school-search-result/school-search-result.component';
import { ProfileComponent } from './modals/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UiModule } from '@pang/ui';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { CoreModule } from '@pang/core';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [
    BottomMenuComponent,
    SearchComponent,
    UserSearchResultComponent,
    SchoolSearchResultComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    UiModule,
    RouterModule,
    MatRippleModule,
    CoreModule,
    MatBadgeModule,
  ],
  exports: [
    BottomMenuComponent,
    SearchComponent,
    UserSearchResultComponent,
    SchoolSearchResultComponent,
    ProfileComponent,
  ],
})
export class SharedModule {}
