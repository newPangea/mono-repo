import { Component, Inject, Input, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, of, Subject, Subscription } from 'rxjs';

import { select, State } from '@ngrx/store';

import { AppState } from '@pang/mobile/app/state/app.state';

import { ResourceType } from '@pang/const';
import { selectResourcesState } from '@pang/mobile/app/state/resources/resources.selectors';
import { User, UserAlgolia } from '@pang/interface';

import { AddMembersNewTeamComponent } from '../add-members-new-team/add-members-new-team.component';

@Component({
  selector: 'pang-add-resources-new-team',
  templateUrl: './add-resources-new-team.component.html',
  styleUrls: ['./add-resources-new-team.component.scss'],
})
export class AddResourcesNewTeamComponent implements OnInit, OnDestroy {
  resources: {
    type: number;
    name: string;
    createdAt: string;
    uid: string;
    icon: string;
    checked: boolean;
  }[] = [];
  resources$: Observable<any>;
  @ViewChildren('myItem') item;
  @Input() owner: string;
  @Input() typeFile: ResourceType;
  inputs$ = new Subject<any>();
  resourcesSubscription: Subscription;
  users: { [key: string]: UserAlgolia } = {};
  filterKey: string;
  selectedResources: {
    type: number;
    name: string;
    createdAt: string;
    uid: string;
    icon: string;
    checked: boolean;
  }[] = [];
  filteredItems: {
    type: number;
    name: string;
    createdAt: string;
    uid: string;
    icon: string;
    checked: boolean;
  }[] = [];

  constructor(
    private state: State<AppState>,
    private bottomSheetRef: MatBottomSheetRef<AddMembersNewTeamComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: {
      resources;
    },
  ) {}

  user$: Observable<User>;
  user: User;

  ngOnInit(): void {
    this.selectedResources = this.data.resources;
    this.getResources();

    this.filterKey = '';
    this.filteredItems = this.resources;

    this.getFilteredData(this.inputs$).subscribe((result) => {
      this.filteredItems = result;
    });
  }

  getFilteredData(inputs: Observable<any>) {
    return inputs.pipe(
      debounceTime(0),
      distinctUntilChanged((p, q) => p.filterKey === q.filterKey),
      switchMap((input) => {
        const key = input.filterKey.trim();

        // Filter the data.
        const result = this.resources.filter((item) =>
          item.name.toLowerCase().includes(key.toLowerCase()),
        );

        return of(result);
      }),
    );
  }

  toggleResources(resource, event) {
    if (event.checked == true) {
      this.selectedResources.push({
        type: resource.avatar,
        name: resource.name,
        createdAt: resource.createdAt,
        uid: resource.uid,
        icon: resource.icon,
        checked: resource.checked,
      });
    } else {
      this.selectedResources.forEach((element, index) => {
        if (element.uid == resource.uid) {
          this.selectedResources.splice(index, 1);
        }
      });
    }
  }

  getResources() {
    this.resources$ = this.state.pipe(select(selectResourcesState));

    this.resourcesSubscription = this.resources$.subscribe((resources) => {
      for (let i = 0; i < 3; i++) {
        resources[i].forEach((element) => {
          this.resources.push({
            type: element.type,
            name: element.name,
            createdAt: element.createAt,
            uid: element.uid,
            icon: this.getfileIcon(element),
            checked: false,
          });
        });
      }
      this.activateChecks(this.resources);
    });
  }

  remove(resource) {
    this.selectedResources.forEach((element, index) => {
      if (element.uid == resource.uid) {
        this.selectedResources.splice(index, 1);
      }
    });
    this.resources.forEach((element) => {
      if (element.uid == resource.uid) {
        element.checked = false;
      }
    });
  }

  getfileIcon(resource) {
    switch (resource.type) {
      case ResourceType.IMAGE:
        return 'assets/img/Image.svg';
      case ResourceType.VIDEO:
        return 'assets/img/Video icon.svg';
      case ResourceType.FILE:
        if (/^.*\.(pdf|PDF)/.test(resource.ref)) {
          return 'assets/img/PDF icon.svg';
        } else if (/^.*\.(docx|ppt)/.test(resource.ref)) {
          return 'assets/img/Wrod icon.svg';
        } else {
          return 'assets/img/Excel. icon.svg';
        }
    }
  }

  onFilterKeyChange(key) {
    this.filterKey = key;
    this.inputs$.next({ filterKey: this.filterKey });
  }

  activateChecks(resources) {
    if (this.selectedResources && this.selectedResources.length > 0) {
      this.selectedResources.forEach((selected) => {
        resources.forEach((user) => {
          if (user.uid == selected.uid) {
            user.checked = true;
          }
        });
      });
    }
  }

  addResources() {
    this.bottomSheetRef.dismiss(this.selectedResources);
  }

  ngOnDestroy() {
    if (this.resourcesSubscription) {
      this.resourcesSubscription.unsubscribe();
    }
  }
}
