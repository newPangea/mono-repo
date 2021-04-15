import { createFeatureSelector } from '@ngrx/store';
import * as fromResources from './resources.reducer';

export const selectResourcesState = createFeatureSelector<fromResources.ResourceState>(
  fromResources.resourcesFeatureKey,
);
