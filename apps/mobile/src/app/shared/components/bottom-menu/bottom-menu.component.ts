import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProfileComponent } from '../../modals/profile/profile.component';
import { ConnectionService } from '@pang/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'pang-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss'],
})
export class BottomMenuComponent implements OnInit {
  $notification: Observable<number>;

  constructor(
    private snackBar: MatSnackBar,
    private connection: ConnectionService,
    private router: Router,
    private bottomSheet: MatBottomSheet,
  ) {}

  ngOnInit(): void {
    this.$notification = this.connection
      .getPendingConnections()
      .pipe(map((connections) => connections.length));
  }

  soon() {
    this.snackBar.open('Available in the next update', 'close', { duration: 2000 });
  }

  goToGlobe() {
    this.router.navigate(['/', 'home']);
  }

  openProfile() {
    this.bottomSheet.open(ProfileComponent, {
      panelClass: 'bottom_modal',
      data: {
        user: 'user data',
      },
    });
  }
}
