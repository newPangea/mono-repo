import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { FormControl } from '@angular/forms';
import { FIRESTORE_COLLECTION, FUNCTION } from '@pang/const';
import { SchoolService } from '@pang/core';
import { User } from '@pang/interface';
import { School } from '@pang/models';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'new-pangea-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input() userKey: string;
  isActiveControl: FormControl = new FormControl(false);
  school$: Observable<School>;
  user$: Observable<User>;

  constructor(
    private angularFn: AngularFireFunctions,
    private fireStore: AngularFirestore,
    private schoolService: SchoolService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.user$ = this.fireStore.collection<User>(FIRESTORE_COLLECTION.user).doc(this.userKey).valueChanges();
    this.setSchool();
    await this.setIsActiveControlValue();
    this.listenIsActiveControlChanges();
  }

  private enableOrDisableAuthUser(uid: string, enabled: boolean): Promise<void> {
    return new Promise((resolve) => {
      this.angularFn
        .httpsCallable(FUNCTION.enableOrDisableAuthUser)({ uid, enabled })
        .pipe(take(1))
        .subscribe(
          () => resolve(),
          () => resolve(),
        );
    });
  }

  private isActivedUser(uid: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.angularFn
        .httpsCallable(FUNCTION.isActiveAuthUser)({ uid })
        .pipe(take(1))
        .subscribe(
          (isActive) => resolve(isActive),
          () => resolve(false),
        );
    });
  }

  private listenIsActiveControlChanges(): void {
    this.isActiveControl.valueChanges.subscribe(async (isActive) => {
      this.isActiveControl.disable({ emitEvent: false });
      await this.enableOrDisableAuthUser(this.userKey, isActive);
      this.isActiveControl.enable({ emitEvent: false });
    });
  }

  private async setIsActiveControlValue(): Promise<void> {
    this.isActiveControl.setValue(await this.isActivedUser(this.userKey));
  }

  private async setSchool() {
    const user = await this.user$.pipe(take(1)).toPromise();
    if (user) {
      this.school$ = this.schoolService
        .findSchoolCode(user.schoolCode)
        .pipe(map((schools) => (schools.length ? schools[0] : null)));
    }
  }
}
