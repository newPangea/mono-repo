import { createReducer, on } from '@ngrx/store';
import * as ResourcesActions from './resources.actions';
import { ResourceInterface } from '@pang/interface';
import { ResourceType } from '@pang/const';

export const resourcesFeatureKey = 'resources';

export interface ResourceState {
  resource: {
    [ResourceType.VIDEO]: ResourceInterface[];
    [ResourceType.IMAGE]: ResourceInterface[];
    [ResourceType.FILE]: ResourceInterface[];
  };
}

export const initialState: ResourceState = {
  resource: {
    [ResourceType.FILE]: [],
    [ResourceType.IMAGE]: [],
    [ResourceType.VIDEO]: [],
  },
};

export const resourcesReducer = createReducer(
  initialState,
  on(ResourcesActions.setResourcesImage, (state, { resources }) => ({
    ...state,
    [ResourceType.IMAGE]: resources,
  })),
  on(ResourcesActions.setResourcesDoc, (state, { resources }) => ({
    ...state,
    [ResourceType.FILE]: resources,
  })),
  on(ResourcesActions.setResourcesVideo, (state, { resources }) => ({
    ...state,
    [ResourceType.VIDEO]: resources,
  })),
);
