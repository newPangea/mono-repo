import { Component, Input, OnChanges } from '@angular/core';
import { UserAlgolia } from '@pang/interface';
import { School } from '@pang/models';

interface SchoolJoin {
  [id: string]: { school: School; user: UserAlgolia[] };
}

@Component({
  selector: 'pang-school-search-result',
  template: `
    <div class="school-search" *ngFor="let school of schoolsName">
      <img src="assets/img/icon-school-active.svg" alt="school icon" />
      <span class="text" [innerHTML]="school.name | highlight: searchText"></span>
    </div>
  `,
  styleUrls: ['./school-search-result.component.scss'],
})
export class SchoolSearchResultComponent implements OnChanges {
  @Input() user: UserAlgolia[];
  @Input() searchText: string;

  schoolsObject: SchoolJoin = {};
  schoolsName: School[] = [];

  ngOnChanges(): void {
    this.schoolsObject = {};
    this.schoolsName = [];
    this.user.forEach((user) => {
      if (user.school) {
        if (!this.schoolsObject[user.school.key]) {
          this.schoolsObject[user.school.key] = {
            school: user.school,
            user: [],
          };
          this.schoolsName = [...this.schoolsName, user.school];
        }
        this.schoolsObject[user.school.key].user.push(user);
      }
    });
  }
}
