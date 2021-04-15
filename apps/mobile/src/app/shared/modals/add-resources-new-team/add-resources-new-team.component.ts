import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { select, State } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';

import { AppState } from '@pang/mobile/app/state/app.state';
import { ResourceInterface, User, UserAlgolia } from '@pang/interface';
import { ResourceType } from '@pang/const';
import { selectResourcesState } from '@pang/mobile/app/state/resources/resources.selectors';

import { AddMembersNewTeamComponent } from '../add-members-new-team/add-members-new-team.component';
import { FilterKey } from '../interfaces/filter-key';
import { ResourcesTeam } from '../interfaces/resources';

@Component({
  selector: 'pang-add-resources-new-team',
  templateUrl: './add-resources-new-team.component.html',
  styleUrls: ['./add-resources-new-team.component.scss'],
})
export class AddResourcesNewTeamComponent implements OnInit, OnDestroy {
  @Input() owner: string;
  @Input() typeFile: ResourceType;

  filteredItems: ResourcesTeam[] = [];
  filterKey: string;
  inputs$ = new Subject<FilterKey>();
  resources: ResourcesTeam[] = [];
  resources$: Observable<ResourceInterface[]>;
  resourcesSubscription: Subscription;
  selectedResources: ResourcesTeam[] = [];
  users: { [key: string]: UserAlgolia } = {};
  user$: Observable<User>;
  user: User;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { resources: ResourcesTeam[] },
    private bottomSheetRef: MatBottomSheetRef<AddMembersNewTeamComponent>,
    private state: State<AppState>,
  ) {}

  ngOnInit(): void {
    this.selectedResources = this.data.resources;
    this.getResources();

    this.filterKey = '';
    this.filteredItems = this.resources;

    this.getFilteredData(this.inputs$).subscribe((result) => {
      this.filteredItems = result;
    });
  }

  getFilteredData(inputs: Observable<FilterKey>) {
    return inputs.pipe(
      debounceTime(0),
      distinctUntilChanged((p, q) => p.filterKey === q.filterKey),
      switchMap((input) => {
        const key = input.filterKey.trim();

        const result = this.resources.filter((item) =>
          item.name.toLowerCase().includes(key.toLowerCase()),
        );

        return of(result);
      }),
    );
  }

  toggleResources(resource: ResourcesTeam, event: MatCheckboxChange) {
    if (event.checked == true) {
      this.selectedResources.push({
        ...resource,
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
    this.resources$ = this.state.pipe(
      select(selectResourcesState),
      map((data) => [
        ...data[ResourceType.FILE],
        ...data[ResourceType.VIDEO],
        ...data[ResourceType.IMAGE],
      ]),
    );

    this.resourcesSubscription = this.resources$.subscribe((respond) => {
      this.resources = respond.map((data) => ({
        ...data,
        icon: this.getfileIcon(data),
        checked: false,
      }));
      this.activateChecks(this.resources);
    });
  }

  remove(resource: ResourcesTeam) {
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

  getfileIcon(resource: ResourceInterface) {
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

  onFilterKeyChange(key: string) {
    this.filterKey = key;
    this.inputs$.next({ filterKey: this.filterKey });
  }

  activateChecks(resources: ResourcesTeam[]) {
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
