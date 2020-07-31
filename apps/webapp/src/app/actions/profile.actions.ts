import { createAction, props } from '@ngrx/store';
import { Profile } from '@portfolio/api-interfaces';

export const loadProfiles = createAction('[Profile] Load Profiles');

export const loadProfilesSuccess = createAction(
  '[Profile] Load Profiles Success',
  props<{ data: Profile }>(),
);

export const loadProfilesFailure = createAction('[Profile] Load Profiles Failure');
