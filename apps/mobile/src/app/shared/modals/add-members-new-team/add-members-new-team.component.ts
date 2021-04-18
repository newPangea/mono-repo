import { AngularFireAuth } from '@angular/fire/auth';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { debounceTime, distinctUntilChanged, first, switchMap } from 'rxjs/operators';
import { Hit } from '@algolia/client-search';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { select, State } from '@ngrx/store';

import { AlgoliaService } from '@pang/algolia';
import { AppState } from '@pang/mobile/app/state/app.state';
import { ConnectionInterface, User, UserAlgolia } from '@pang/interface';
import { environment } from '@pang/mobile/environments/environment';
import { selectMyConnections } from '@pang/mobile/app/state/connection/connection.selectors';

import { FilterKey } from '../interfaces/filter-key';
import { MemberData } from '../interfaces/member-interface';
import { SelectedMembers } from '../interfaces/selected-members';
import { codeToName } from '@pang/utils';

@Component({
  selector: 'pang-add-members-new-team',
  templateUrl: './add-members-new-team.component.html',
  styleUrls: ['./add-members-new-team.component.scss'],
})
export class AddMembersNewTeamComponent implements OnInit, OnDestroy {
  $connections: Observable<ConnectionInterface[]>;
  arrayTransformed: string;
  connectionsSubscription: Subscription;
  filteredItems: MemberData[] = [];
  filterKey: string;
  hits: Array<Hit<UserAlgolia>> = [];
  inputs$ = new Subject<FilterKey>();
  load = true;
  selectedMembers: SelectedMembers[] = [];
  uid: string;
  user: User;
  user$: Observable<User>;
  users: MemberData[] = [];

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { members: MemberData[] },
    private algoliaService: AlgoliaService,
    private auth: AngularFireAuth,
    private bottomSheetRef: MatBottomSheetRef<AddMembersNewTeamComponent>,
    private state: State<AppState>,
  ) {
    this.auth.currentUser.then(({ uid }) => {
      this.uid = uid;
      this.getConnectionsState(this.uid);
    });
  }

  ngOnInit(): void {
    this.selectedMembers = this.data.members;

    this.filterKey = '';
    this.filteredItems = this.users;

    this.getFilteredData(this.inputs$).subscribe((result) => {
      this.filteredItems = result;
    });
  }

  addMembers() {
    this.bottomSheetRef.dismiss(this.selectedMembers);
  }

  getConnectionsState(uid: string) {
    this.state.pipe(first(), select(selectMyConnections)).subscribe((connections) => {
      const keys = [];
      connections.forEach((element) => {
        if (element.from != uid) {
          keys.push(element.from);
        }
        if (element.to != uid) {
          keys.push(element.to);
        }
      });

      const objectIDsArray = this.transformArray(keys);
      this.algoliaSearchData(objectIDsArray);
    });
  }

  remove(member: MemberData) {
    this.selectedMembers.forEach((element, index) => {
      if (element.uid == member.uid) {
        this.selectedMembers.splice(index, 1);
      }
    });
    this.users.forEach((element) => {
      if (element.uid == member.uid) {
        element.checked = false;
      }
    });
  }

  toggleMember(user: SelectedMembers, event: MatCheckboxChange) {
    if (event.checked == true) {
      this.selectedMembers.push({
        avatar: user.avatar,
        uid: user.uid,
      });
    } else {
      this.selectedMembers = this.selectedMembers.filter((element) => element.uid !== user.uid);
    }
  }

  transformArray(array: string[]) {
    for (let index = 0; index < array.length; index++) {
      if (array.length > 1) {
        if (index == 0) {
          this.arrayTransformed = '[["objectID:' + array[index] + '",';
        } else if (index == array.length - 1) {
          this.arrayTransformed += ' "objectID:' + array[index] + '"]]';
        } else {
          this.arrayTransformed += ' "objectID:' + array[index] + '",';
        }
      } else if (array.length == 1) {
        this.arrayTransformed = '[["objectID:' + array[index] + '"]]';
      } else {
        this.arrayTransformed = '';
      }
    }
    return this.arrayTransformed;
  }

  algoliaSearchData(keys: string) {
    if (!!keys) {
      this.algoliaService
        .search<UserAlgolia>(environment.userAlgoliaIndex, '', {
          facetFilters: keys,
        })
        .then(({ hits }) => {
          this.hits = hits;
          hits.forEach((element) => {
            this.addToUsers(element);
          });
          this.activateChecks(this.users);
        });
      this.load = false;
    }
  }

  activateChecks(users: MemberData[]) {
    if (this.selectedMembers && this.selectedMembers.length > 0) {
      this.selectedMembers.forEach((selected) => {
        users.forEach((user) => {
          if (user.uid == selected.uid) {
            user.checked = true;
          }
        });
      });
    }
  }

  addToUsers(user: User) {
    this.users.push({
      name: user.name,
      address: user.school.addres.split(','),
      avatar: user.imgUrl,
      checked: false,
      uid: user.uid,
      country: user.country.code,
      role: this.getNameCode(user.code),
    });
  }

  onFilterKeyChange(key: string) {
    this.filterKey = key;
    this.inputs$.next({ filterKey: this.filterKey });
  }

  ngOnDestroy() {
    if (this.connectionsSubscription) {
      this.connectionsSubscription.unsubscribe();
    }
  }

  close(): void {
    this.bottomSheetRef.dismiss();
  }

  getNameCode(code: string) {
    return code ? codeToName(code) : '';
  }

  getFilteredData(inputs: Observable<FilterKey>) {
    return inputs.pipe(
      debounceTime(0),
      distinctUntilChanged((p, q) => p.filterKey === q.filterKey),
      switchMap((input) => {
        const key = input.filterKey.trim();

        const result = this.users.filter((item) =>
          item.name.toLowerCase().includes(key.toLowerCase()),
        );

        return of(result);
      }),
    );
  }
}
