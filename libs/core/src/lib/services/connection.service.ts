import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/firestore/interfaces';

import { ConnectionStatus, FIRESTORE_COLLECTION } from '@pang/const';
import { ConnectionInterface } from '@pang/interface';
import { filter, first, switchMap, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  readonly connection = (qf?: QueryFn) =>
    this.db.collection<ConnectionInterface>(FIRESTORE_COLLECTION.connection, qf);

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {}

  async sendConnectionRequest(to: string, from: string) {
    const key = this.db.createId();
    return this.connection().doc(key).set({
      to,
      from,
      status: ConnectionStatus.CREATE,
      key,
    });
  }

  getPendingConnections() {
    const logOut = this.auth.authState.pipe(filter((user) => !user));

    return this.auth.user.pipe(
      first(),
      takeUntil(logOut),
      switchMap(({ uid }) =>
        this.connection((ref) =>
          ref.where('from', '==', uid).where('status', '==', ConnectionStatus.CREATE),
        ).valueChanges(),
      ),
    );
  }

  getConnection(to: string, from: string) {
    return this.connection((ref) =>
      ref.where('to', '==', to).where('from', '==', from),
    ).valueChanges();
  }
}
