import { createAction, props } from '@ngrx/store';
import { IUser } from '@portfolio/api-interfaces';

export const loadProfiles = createAction('[Profile] Load Profiles');

export const loadProfilesSuccess = createAction(
  '[Profile] Load Profiles Success',
  props<{ data: IUser }>(),
);

export const loadProfilesFailure = createAction('[Profile] Load Profiles Failure');
