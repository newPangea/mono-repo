import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomMenuComponent } from './components/bottom-menu/bottom-menu.component';
import { SearchComponent } from './components/search/search.component';
import { UserSearchResultComponent } from './components/user-search-result/user-search-result.component';
import { SchoolSearchResultComponent } from './components/school-search-result/school-search-result.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UiModule } from '@pang/ui';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BottomMenuComponent,
    SearchComponent,
    UserSearchResultComponent,
    SchoolSearchResultComponent,
  ],
  imports: [CommonModule, FormsModule, MatIconModule, MatInputModule, UiModule, RouterModule],
  exports: [BottomMenuComponent, SearchComponent],
})
export class SharedModule {}
