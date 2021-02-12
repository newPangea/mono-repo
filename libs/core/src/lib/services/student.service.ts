import { Injectable } from '@angular/core';
import { Student, studentConvert } from '@pang/interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FIRESTORE_COLLECTION } from '@pang/const';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(
    private fireAuth: AngularFireAuth,
    private db: AngularFirestore,
    private messageService: MessageService,
  ) {}

  async createStudent(student: Student, password: string) {
    const dataUser = await this.fireAuth.createUserWithEmailAndPassword(student.email, password);
    const { uid } = dataUser.user;
    student.uid = uid;
    student.validateCode = false;
    await this.db.firestore.collection(FIRESTORE_COLLECTION.student).withConverter(studentConvert).add(student);
    return this.messageService.sendConfirmationCode(student.email).toPromise();
  }
}
