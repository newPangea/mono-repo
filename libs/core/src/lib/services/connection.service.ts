import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ConnectionStatus, FIRESTORE_COLLECTION } from '@pang/const';
import { ConnectionInterface } from '@pang/interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { QueryFn } from '@angular/fire/firestore/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  readonly connection = (qf?: QueryFn) =>
    this.db.collection<ConnectionInterface>(FIRESTORE_COLLECTION.connection, qf);

  constructor(private db: AngularFirestore) {}

  async sendConnectionRequest(to: string, from: string) {
    const key = this.db.createId();
    return this.connection().doc(key).set({
      to,
      from,
      status: ConnectionStatus.CREATE,
      key,
    });
  }

  getConnection(to: string, from: string) {
    return this.connection((ref) =>
      ref.where('to', '==', to).where('from', '==', from),
    ).valueChanges();
  }
}
