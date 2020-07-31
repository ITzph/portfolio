import { Action, createReducer, on } from '@ngrx/store';
import * as ProfileActions from '../actions/profile.actions';
import { Profile } from '@portfolio/api-interfaces';

export const profileFeatureKey = 'profile';

export interface State {
  profile: Profile;
}

export const initialState: State = {
  profile: Profile.defaultInstance(),
};

export const reducer = createReducer(
  initialState,

  on(ProfileActions.loadProfiles, (state) => state),
  on(ProfileActions.loadProfilesSuccess, (state, action) => state),
  on(ProfileActions.loadProfilesFailure, (state, action) => state),
);
