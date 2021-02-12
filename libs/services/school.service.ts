import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { School } from '@pang/models';


@Injectable({
  providedIn: 'root',
})

export class SchoolService {
  public didLogout: EventEmitter<void> = new EventEmitter();

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {}

  add(school: School) {
    return this.db.collection(School.REF).doc(school.key).set(Object.assign({}, school));
  }

  getAll() {
    return this.db
      .collection<School>(School.REF, (ref) => ref.orderBy('created_at', 'desc'))
      .valueChanges();
  }


  findSchoolCode(code: string) {
    return this.db
      .collection<School>(School.REF, (ref) =>
        ref
        .where("scode", "==", code)
      )
      .valueChanges();
  }

}
