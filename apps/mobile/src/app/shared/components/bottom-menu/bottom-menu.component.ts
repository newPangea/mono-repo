import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { HIDDEN_SECTIONS } from '@pang/const';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { select, State } from '@ngrx/store';

import { AppState } from '@pang/mobile/app/state/app.state';
import { selectConnectionNotification } from '@pang/mobile/app/state/connection/connection.selectors';

import { ProfileComponent } from '../../modals/profile/profile.component';

@Component({
  selector: 'pang-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss'],
})
export class BottomMenuComponent implements OnInit {
  $notification: Observable<number>;
  hide: boolean;

  constructor(
    private bottomSheet: MatBottomSheet,
    private router: Router,
    private state: State<AppState>,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.hide = HIDDEN_SECTIONS.bottomMenuFilter;
    this.$notification = this.state
      .pipe(select(selectConnectionNotification))
      .pipe(map((connections) => connections.length));
  }

  goToCommunity() {
    this.router.navigate(['/home/community']);
  }

  goToGlobe() {
    this.router.navigate(['/', 'home']);
  }

  openProfile() {
    this.bottomSheet.open(ProfileComponent, {
      panelClass: 'profile_sheet',
      data: {
        user: 'user data',
      },
    });
  }
}
