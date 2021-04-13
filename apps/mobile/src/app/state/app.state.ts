import {
  connectionFeatureKey,
  ConnectionState,
} from '@pang/mobile/app/state/connection/connection.reducer';
import {
  resourcesFeatureKey,
  ResourceState,
} from '@pang/mobile/app/state/resources/resources.reducer';

export interface AppState {
  [connectionFeatureKey]: Readonly<ConnectionState>;
  [resourcesFeatureKey]: Readonly<ResourceState>;
}
