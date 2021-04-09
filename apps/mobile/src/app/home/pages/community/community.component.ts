import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FIRESTORE_COLLECTION } from '@pang/const';
import { User, UserAlgolia } from '@pang/interface';
import { School } from '@pang/models';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'pang-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
})
export class CommunityComponent implements OnInit {
  school: School;
  sLatitude: number;
  sLongitude: number;
  user: User;
  user$: Observable<User>;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private fireStore: AngularFirestore,
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  async getUserInfo() {
    const user = await this.auth.currentUser;
    this.user$ = this.fireStore
      .collection<User>(FIRESTORE_COLLECTION.user)
      .doc(user.uid)
      .valueChanges();
    this.user = await this.user$.pipe(take(1)).toPromise();
  }

  goToUser(user: UserAlgolia) {
    this.router.navigate(['/home/user/', user.uid]);
  }

  goToSchool(school: School) {
    this.school = school;
    this.sLatitude = this.school.latitude;
    this.sLongitude = this.school.longitude;
  }
}
