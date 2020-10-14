import { createAction, props } from '@ngrx/store';
import { IUser } from '@portfolio/api-interfaces';

export enum ProfileAction {
  SetProfile = '[Profile] Set',
  UpdateProfile = '[Profile] Update',
}

export const setProfile = createAction(ProfileAction.SetProfile, props<{ profile: IUser }>());

export const updateProfile = createAction(
  ProfileAction.UpdateProfile,
  props<{ profile: Partial<IUser> }>(),
);
