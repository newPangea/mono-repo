import { Injectable } from '@angular/core';
import { User, studentConvert } from '@pang/interface';
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

  private readonly studentCollection = this.db.collection<User>(FIRESTORE_COLLECTION.student);

  async createStudent(student: User, password: string) {
    const dataUser = await this.fireAuth.createUserWithEmailAndPassword(student.email, password);
    const { uid } = dataUser.user;
    student.uid = uid;
    student.validateCode = false;
    await this.db.firestore
      .collection(FIRESTORE_COLLECTION.student)
      .withConverter(studentConvert)
      .doc(uid)
      .set(student);
    return this.messageService.sendConfirmationCode(student.email).toPromise();
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