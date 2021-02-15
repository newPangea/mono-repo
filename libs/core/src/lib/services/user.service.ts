import { Injectable } from '@angular/core';
import { User, userConvert } from '@pang/interface';
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

  private readonly studentCollection = this.db.collection<User>(FIRESTORE_COLLECTION.user);

  async createUser(user: User, password: string) {
    const dataUser = await this.fireAuth.createUserWithEmailAndPassword(user.email, password);
    const { uid } = dataUser.user;
    user.uid = uid;
    user.validateCode = false;
    await this.db.firestore
      .collection(FIRESTORE_COLLECTION.user)
      .withConverter(userConvert)
      .doc(uid)
      .set(user);
    return this.messageService.sendConfirmationCode(user.email).toPromise();
  }

  validateCode(code: string) {
    return from(this.fireAuth.currentUser).pipe(
      switchMap((user) =>
        this.messageService.confirmCode(code, user.email).pipe(map((confirm) => ({ ...confirm, user }))),
      ),
      switchMap(({ valid, user }) =>
        iif(
          () => valid,
          from(this.studentCollection.doc(user.uid).update({ validateCode: true })).pipe(map(() => ({ valid }))),
          of({ valid }),
        ),
      ),
    );
  }
}
