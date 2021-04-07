import { createAction, props } from '@ngrx/store';
import { ConnectionInterface } from '@pang/interface';

export const loadConnections = createAction('[Connection] Load Connections');

export const loadPendingConnection = createAction('[Connection] load pending connection');

export const setPendingConnection = createAction(
  '[Connection] set pending connection',
  props<{ connection: ConnectionInterface[] }>(),
);
