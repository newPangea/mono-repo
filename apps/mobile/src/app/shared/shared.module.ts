import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BottomMenuComponent } from './components/bottom-menu/bottom-menu.component';
import { SearchComponent } from './components/search/search.component';
import { UserSearchResultComponent } from './components/user-search-result/user-search-result.component';
import { SchoolSearchResultComponent } from './components/school-search-result/school-search-result.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UiModule } from '@pang/ui';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './modals/profile/profile.component';

@NgModule({
  declarations: [
    BottomMenuComponent,
    SearchComponent,
    UserSearchResultComponent,
    SchoolSearchResultComponent,
    ProfileComponent,
  ],
  imports: [CommonModule, MatIconModule, RouterModule, MatInputModule, UiModule, FormsModule],
  exports: [
    BottomMenuComponent,
    SearchComponent,
    UserSearchResultComponent,
    SchoolSearchResultComponent,
    ProfileComponent,
  ],
})
export class SharedModule {}
