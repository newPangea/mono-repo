import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, filter, map, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as ConnectionActions from './connection.actions';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { ConnectionService } from '@pang/core';

@Injectable()
export class ConnectionEffects {
  private readonly logOut$: Observable<firebase.User>;

  loadConnections$ = createEffect(() => {
    return this.actions$.pipe(
      takeUntil(this.logOut$),
      ofType(ConnectionActions.loadPendingConnection),
      concatMap(() =>
        this.connection
          .getPendingConnections()
          .pipe(map((connection) => ConnectionActions.setPendingConnection({ connection }))),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private auth: AngularFireAuth,
    private connection: ConnectionService,
  ) {
    this.logOut$ = this.auth.authState.pipe(filter((user) => !user));
  }
}
