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
import { AddMembersNewTeamComponent } from './modals/add-members-new-team/add-members-new-team.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddResourcesNewTeamComponent } from './modals/add-resources-new-team/add-resources-new-team.component';

@NgModule({
  declarations: [
    BottomMenuComponent,
    ProfileComponent,
    SchoolSearchResultComponent,
    SearchComponent,
    TemplateComponent,
    UserSearchResultComponent,
    AddMembersNewTeamComponent,
    AddResourcesNewTeamComponent,
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
    MatCheckboxModule,
  ],
  exports: [
    BottomMenuComponent,
    ProfileComponent,
    SchoolSearchResultComponent,
    SearchComponent,
    TemplateComponent,
    UserSearchResultComponent,
    AddMembersNewTeamComponent,
    AddResourcesNewTeamComponent,
  ],
})
export class SharedModule {}
