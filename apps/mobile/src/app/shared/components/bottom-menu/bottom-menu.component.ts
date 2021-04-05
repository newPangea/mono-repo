import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProfileComponent } from '../../modals/profile/profile.component';

@Component({
  selector: 'pang-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss'],
})
export class BottomMenuComponent {
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private bottomSheet: MatBottomSheet,
  ) {}

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
