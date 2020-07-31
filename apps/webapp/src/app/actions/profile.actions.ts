import { createAction, props } from '@ngrx/store';

export const loadProfiles = createAction('[Profile] Load Profiles');

export const loadProfilesSuccess = createAction(
  '[Profile] Load Profiles Success',
  props<{ data: any }>(),
);

export const loadProfilesFailure = createAction(
  '[Profile] Load Profiles Failure',
  props<{ error: any }>(),
);
