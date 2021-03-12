import { Injectable } from '@angular/core';
import { Preference, User, userConvert } from '@pang/interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FIRESTORE_COLLECTION } from '@pang/const';
import { MessageService } from './message.service';
import { from, iif, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private fireAuth: AngularFireAuth,
    private db: AngularFirestore,
    private messageService: MessageService,
  ) {}

  private readonly userReference = this.db.firestore.collection(FIRESTORE_COLLECTION.user).withConverter(userConvert);
  private readonly userCollection = this.db.collection<User>(this.userReference);

  async createUser(user: User, password: string) {
    const dataUser = await this.fireAuth.createUserWithEmailAndPassword(user.email, password);
    const { uid } = dataUser.user;
    user.uid = uid;
    user.validateCode = false;
    await this.userCollection.doc(uid).set(user);
    return this.messageService.sendConfirmationCode(user.email).toPromise();
  }

  getAll() {
    return this.db.collection<User>(FIRESTORE_COLLECTION.user).valueChanges();
  }

  validateCode(code: string) {
    return from(this.fireAuth.currentUser).pipe(
      switchMap((user) =>
        this.messageService.confirmCode(code, user.email).pipe(map((confirm) => ({ ...confirm, user }))),
      ),
      switchMap(({ valid, user }) =>
        iif(
          () => valid,
          from(this.userCollection.doc(user.uid).update({ validateCode: true })).pipe(map(() => ({ valid }))),
          of({ valid }),
        ),
      ),
    );
  }

  savePreferences(uid: string, preferences: Preference[], bio: string, imgUrl: string = '') {
    return this.userCollection.doc(uid).update({ preferences, bio, imgUrl });
  }
}
