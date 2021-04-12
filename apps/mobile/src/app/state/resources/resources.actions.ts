import { createAction, props } from '@ngrx/store';
import { ResourceInterface } from '@pang/interface';

export const loadResourcesImage = createAction('[Resources] Load Resources image');

export const loadResourcesVideo = createAction('[Resources] Load Resources video');

export const loadResourcesDoc = createAction('[Resources] Load Resources doc');

export const setResourcesImage = createAction(
  '[Resources] Set Resources image',
  props<{ resources: ResourceInterface[] }>(),
);

export const setResourcesVideo = createAction(
  '[Resources] Set Resources video',
  props<{ resources: ResourceInterface[] }>(),
);

export const setResourcesDoc = createAction(
  '[Resources] Set Resources doc',
  props<{ resources: ResourceInterface[] }>(),
);
