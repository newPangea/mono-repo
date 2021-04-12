import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { filter, map, switchMap, takeUntil } from 'rxjs/operators';

import * as ResourcesActions from './resources.actions';
import { AngularFireAuth } from '@angular/fire/auth';
import { ResourceService } from '@pang/core';
import { ResourceType } from '@pang/const';

@Injectable()
export class ResourcesEffects {
  private readonly logOut$ = this.auth.authState.pipe(filter((user) => !user));

  loadResourcesImage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ResourcesActions.loadResourcesImage),
      switchMap(() =>
        this.resourcesService.getMyResource(ResourceType.IMAGE).pipe(
          takeUntil(this.logOut$),
          map((resources) => ResourcesActions.setResourcesImage({ resources })),
        ),
      ),
    );
  });

  loadResourcesDoc$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ResourcesActions.loadResourcesImage),
      switchMap(() =>
        this.resourcesService.getMyResource(ResourceType.FILE).pipe(
          takeUntil(this.logOut$),
          map((resources) => ResourcesActions.setResourcesDoc({ resources })),
        ),
      ),
    );
  });

  loadResourcesVideo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ResourcesActions.loadResourcesVideo),
      switchMap(() =>
        this.resourcesService
          .getMyResource(ResourceType.VIDEO)
          .pipe(map((resources) => ResourcesActions.setResourcesVideo({ resources }))),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private auth: AngularFireAuth,
    private resourcesService: ResourceService,
  ) {}
}
