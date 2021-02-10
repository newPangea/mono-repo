import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {

  constructor(
    private db: AngularFirestore,
  ) {}

  getFirestoreId(): string {
    return this.db.createId();
  }
}