import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as ProfileActions from '../actions/profile.actions';

@Injectable()
export class ProfileEffects {
  loadProfiles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.loadProfiles),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map((data) => ProfileActions.loadProfilesSuccess({ data })),
          catchError((error) => of(ProfileActions.loadProfilesFailure({ error }))),
        ),
      ),
    );
  });

  constructor(private actions$: Actions) {}
}
