import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FIRESTORE_COLLECTION } from '@pang/const';
import { User } from '@pang/interface';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'pang-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user$: Observable<User>;
  user: User;
  address: string[];
  firstName: string[];

  constructor(
    private auth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private bottomSheetRef: MatBottomSheetRef<ProfileComponent>,
    private snackBar: MatSnackBar,
    private router: Router,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: {
      user: string;
    },
  ) {}

  ngOnInit() {
    this.getUserInfo();
  }

  async getUserInfo() {
    const user = await this.auth.currentUser;
    this.user$ = this.fireStore
      .collection<User>(FIRESTORE_COLLECTION.user)
      .doc(user.uid)
      .valueChanges();
    this.user = await this.user$.pipe(take(1)).toPromise();
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
