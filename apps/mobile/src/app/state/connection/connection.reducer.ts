import { createReducer, on } from '@ngrx/store';
import * as ConnectionActions from './connection.actions';
import { ConnectionInterface } from '@pang/interface';

export const connectionFeatureKey = 'connection';

export interface ConnectionState {
  notifications: {
    connections: ConnectionInterface[];
  };
}

export const initialState: ConnectionState = {
  notifications: {
    connections: [],
  },
};

export const ConnectionReducer = createReducer(
  initialState,
  on(ConnectionActions.loadConnections, (state) => state),
  on(ConnectionActions.setPendingConnection, (state, action) => {
    return { ...state, notifications: { ...state.notifications, connections: action.connection } };
  }),
);
