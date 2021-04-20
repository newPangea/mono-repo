import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';

import { HIDDEN_SECTIONS } from '@pang/const';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { select, State } from '@ngrx/store';

import { AppState } from '@pang/mobile/app/state/app.state';
import { selectConnectionNotification } from '@pang/mobile/app/state/connection/connection.selectors';

import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'pang-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss'],
})
export class BottomMenuComponent implements OnInit {
  $notification: Observable<number>;
  hide: boolean;
  uid: string;

  constructor(
    private bottomSheet: MatBottomSheet,
    private router: Router,
    private state: State<AppState>,
    private auth: AngularFireAuth,
  ) {
    this.auth.currentUser.then((user) => (this.uid = user.uid));
  }

  ngOnInit(): void {
    this.hide = HIDDEN_SECTIONS.bottomMenuFilter;
    this.$notification = this.state
      .pipe(select(selectConnectionNotification))
      .pipe(map((connections) => connections.length));
  }

  goToCommunity() {
    this.router.navigate(['/home/community', this.uid]);
  }

  goToGlobe() {
    this.router.navigate(['/', 'home']);
  }

  openProfile() {
    this.router.navigate(['/home/user', this.uid]);
  }
}
