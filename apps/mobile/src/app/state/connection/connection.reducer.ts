import { createReducer, on } from '@ngrx/store';
import * as ConnectionActions from './connection.actions';
import { ConnectionInterface } from '@pang/interface';

export const connectionFeatureKey = 'connection';

export interface ConnectionState {
  notifications: {
    connections: ConnectionInterface[];
  };
  connections: ConnectionInterface[];
}

export const initialState: ConnectionState = {
  notifications: {
    connections: [],
  },
  connections: [],
};

export const ConnectionReducer = createReducer(
  initialState,
  on(ConnectionActions.setPendingConnection, (state, action) => {
    return { ...state, notifications: { ...state.notifications, connections: action.connection } };
  }),
  on(ConnectionActions.setConnections, (state, action) => {
    return { ...state, connections: action.connection };
  }),
);
