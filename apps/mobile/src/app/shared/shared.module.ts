import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreModule } from '@pang/core';
import { UiModule } from '@pang/ui';

import { BottomMenuComponent } from './components/bottom-menu/bottom-menu.component';
import { ProfileComponent } from './modals/profile/profile.component';
import { SchoolSearchResultComponent } from './components/school-search-result/school-search-result.component';
import { SearchComponent } from './components/search/search.component';
import { TemplateComponent } from './components/template/template.component';
import { UserSearchResultComponent } from './components/user-search-result/user-search-result.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    BottomMenuComponent,
    ProfileComponent,
    SchoolSearchResultComponent,
    SearchComponent,
    TemplateComponent,
    UserSearchResultComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    MatBadgeModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,
    RouterModule,
    UiModule,
    MatButtonModule,
  ],
  exports: [
    BottomMenuComponent,
    ProfileComponent,
    SchoolSearchResultComponent,
    SearchComponent,
    TemplateComponent,
    UserSearchResultComponent,
  ],
})
export class SharedModule {}
