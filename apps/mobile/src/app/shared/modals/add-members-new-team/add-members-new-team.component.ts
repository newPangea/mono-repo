import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, Inject, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

import { debounceTime, distinctUntilChanged, switchMap, take } from 'rxjs/operators';
import { select, State } from '@ngrx/store';
import { Observable, of, Subject, Subscription } from 'rxjs';

import { Hit } from '@algolia/client-search';

import { AlgoliaService } from '@pang/algolia';
import { AppState } from '@pang/mobile/app/state/app.state';
import { ConnectionInterface, User, UserAlgolia } from '@pang/interface';
import { environment } from '@pang/mobile/environments/environment';
import { FIRESTORE_COLLECTION } from '@pang/const';
import { selectMyConnections } from '@pang/mobile/app/state/connection/connection.selectors';

@Component({
  selector: 'pang-add-members-new-team',
  templateUrl: './add-members-new-team.component.html',
  styleUrls: ['./add-members-new-team.component.scss'],
})
export class AddMembersNewTeamComponent implements OnInit, OnDestroy {
  $connections: Observable<ConnectionInterface[]>;
  @ViewChildren('myItem') item;
  connectionsSubscription: Subscription;

  inputs$ = new Subject<any>();
  hits: Array<Hit<UserAlgolia>> = [];
  filterKey;
  items;
  filteredItems;
  arrayTransformed;
  selectedMembers: {
    avatar: string;
    uid: string;
  }[] = [];
  users: {
    name: string;
    address: string[];
    avatar: string;
    checked: boolean;
    uid: string;
  }[] = [];

  constructor(
    private algoliaService: AlgoliaService,
    private auth: AngularFireAuth,
    private bottomSheetRef: MatBottomSheetRef<AddMembersNewTeamComponent>,
    private fireStore: AngularFirestore,
    private state: State<AppState>,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: {
      members;
    },
  ) {}

  user$: Observable<User>;
  user: User;

  ngOnInit(): void {
    this.selectedMembers = this.data.members;

    this.getUserInfo();

    this.filterKey = '';
    this.filteredItems = this.users;

    this.getFilteredData(this.inputs$).subscribe((result) => {
      this.filteredItems = result;
    });
  }

  addMembers() {
    this.bottomSheetRef.dismiss(this.selectedMembers);
  }

  async getUserInfo() {
    const user = await this.auth.currentUser;
    this.user$ = this.fireStore
      .collection<User>(FIRESTORE_COLLECTION.user)
      .doc(user.uid)
      .valueChanges();
    this.user = await this.user$.pipe(take(1)).toPromise();
    this.getConnectionsState(this.user);
  }

  getConnectionsState(user: User) {
    this.$connections = this.state.pipe(select(selectMyConnections));
    this.connectionsSubscription = this.$connections.subscribe((connections) => {
      const keys = [];
      connections.forEach((element) => {
        if (element.from != user.uid) {
          keys.push(element.from);
        }
        if (element.to != user.uid) {
          keys.push(element.to);
        }
      });

      const objectIDsArray = this.transformArray(keys);
      this.algoliaSearchData(objectIDsArray);
    });
  }

  remove(member) {
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

  toggleMember(user, event) {
    if (event.checked == true) {
      this.selectedMembers.push({
        avatar: user.avatar,
        uid: user.uid,
      });
    } else {
      this.selectedMembers.forEach((element, index) => {
        if (element.uid == user.uid) {
          this.selectedMembers.splice(index, 1);
        }
      });
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
    if (keys && keys != '') {
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
    }
  }

  activateChecks(users) {
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
    });
  }

  onFilterKeyChange(key) {
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

  getFilteredData(inputs: Observable<any>) {
    return inputs.pipe(
      debounceTime(0),
      distinctUntilChanged((p, q) => p.filterKey === q.filterKey),
      switchMap((input) => {
        const key = input.filterKey.trim();

        // Filter the data.
        const result = this.users.filter((item) =>
          item.name.toLowerCase().includes(key.toLowerCase()),
        );

        return of(result);
      }),
    );
  }
}
