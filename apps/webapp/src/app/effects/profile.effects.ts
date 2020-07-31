import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as ProfileActions from '../actions/profile.actions';
import { HttpClient } from '@angular/common/http';
import { Profile } from '@portfolio/api-interfaces';

@Injectable()
export class ProfileEffects {
  loadProfiles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.loadProfiles),
      concatMap(() =>
        this.httpClient.get<Profile>('/api/profiles/me').pipe(
          map((data) => ProfileActions.loadProfilesSuccess({ data })),
          catchError((error) => of(ProfileActions.loadProfilesFailure())),
        ),
      ),
    );
  });

  constructor(private readonly actions$: Actions, private readonly httpClient: HttpClient) {}
}
