import { createAction, props } from '@ngrx/store';
import { IUser } from '@portfolio/api-interfaces';

export enum ProfileAction {
  SetProfile = '[Profile] Set',
}

export const setProfile = createAction(ProfileAction.SetProfile, props<{ profile: IUser }>());
