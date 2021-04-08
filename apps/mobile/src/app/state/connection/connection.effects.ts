import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { TypedAction } from '@ngrx/store/src/models';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';

import * as ConnectionActions from './connection.actions';
import { ConnectionInterface } from '@pang/interface';
import { ConnectionService } from '@pang/core';

@Injectable()
export class ConnectionEffects {
  private readonly logOut$: Observable<firebase.User>;
  private loadConnections$: Observable<
    { connection: ConnectionInterface[] } & TypedAction<string>
  > &
    CreateEffectMetadata;

  constructor(
    private actions$: Actions,
    private auth: AngularFireAuth,
    private connection: ConnectionService,
  ) {
    this.logOut$ = this.auth.authState.pipe(filter((user) => !user));

    this.loadConnections$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(ConnectionActions.loadPendingConnection),
        switchMap(() =>
          this.connection.getPendingConnections().pipe(
            takeUntil(this.logOut$),
            map((connection) => ConnectionActions.setPendingConnection({ connection })),
          ),
        ),
      );
    });
  }
}
