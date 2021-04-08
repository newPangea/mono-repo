import {
  connectionFeatureKey,
  ConnectionState,
} from '@pang/mobile/app/state/connection/connection.reducer';

export interface AppState {
  [connectionFeatureKey]: Readonly<ConnectionState>;
}
