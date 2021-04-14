import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromConnection from './connection.reducer';
import { AppState } from '@pang/mobile/app/state/app.state';

export const selectConnectionState = createFeatureSelector<
  AppState,
  fromConnection.ConnectionState
>(fromConnection.connectionFeatureKey);

export const selectConnectionNotification = createSelector(
  selectConnectionState,
  (data) => data.notifications.connections,
);

export const selectMyConnections = createSelector(
  selectConnectionState,
  (data) => data.connections,
);
