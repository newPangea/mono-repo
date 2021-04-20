import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from '@pang/interface';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'pang-profile',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss'],
})
export class ProfileModalComponent implements OnInit {
  user$: Observable<User>;
  user: User;
  address: string[];
  firstName: string[];
  uid: string;

  constructor(
    private auth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private bottomSheetRef: MatBottomSheetRef<ProfileModalComponent>,
    private snackBar: MatSnackBar,
    private router: Router,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: {
      user: User;
    },
  ) {
    this.auth.currentUser.then(({ uid }) => (this.uid = uid));
  }

  ngOnInit() {
    this.user = this.data.user;
    this.address = this.user.school.addres.split(',');
    this.firstName = this.user.name.split(' ');
  }

  close(): void {
    this.bottomSheetRef.dismiss();
  }

  soon() {
    this.snackBar.open('Available in the next update', 'close', { duration: 2000 });
  }

  async logout() {
    await this.auth.signOut();
    await this.router.navigate(['/']);
    this.bottomSheetRef.dismiss();
  }
}
