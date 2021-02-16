import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { FormControl } from '@angular/forms';
import { FIRESTORE_COLLECTION, FUNCTION } from '@pang/const';
import { User } from '@pang/interface';
import { Observable } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';

@Component({
  selector: 'new-pangea-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input() userKey: string;
  user$: Observable<User>;

  isActiveControl: FormControl = new FormControl(false);
  private readonly IS_ACTIVE_CONTROL_DELAY = 1000;

  constructor(private angularFn: AngularFireFunctions, private fireStore: AngularFirestore) {}

  async ngOnInit(): Promise<void> {
    this.user$ = this.fireStore.collection<User>(FIRESTORE_COLLECTION.student).doc(this.userKey).valueChanges();
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
    this.isActiveControl.valueChanges.pipe(debounceTime(this.IS_ACTIVE_CONTROL_DELAY)).subscribe(async (isActive) => {
      this.toggleIsActiveControl(true);
      await this.enableOrDisableAuthUser(this.userKey, isActive);
      this.toggleIsActiveControl(false);
    });
  }

  private async setIsActiveControlValue(): Promise<void> {
    this.isActiveControl.setValue(await this.isActivedUser(this.userKey));
  }

  private toggleIsActiveControl(value: boolean) {
    this.isActiveControl.setValue({ disabled: value }, { emitEvent: false });
  }
}
