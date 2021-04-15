import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(private db: AngularFirestore) {}

  getFirestoreId(): string {
    return this.db.createId();
  }
}
