import { Action, createReducer, on } from '@ngrx/store';
import * as ProfileActions from '../actions/profile.actions';
import { IUser } from '@portfolio/api-interfaces';

export const profileFeatureKey = 'profile';

export interface State {
  currentUser: IUser;
}

export const initialState: State = {
  currentUser: null,
};

export const reducer = createReducer(
  initialState,

  on(
    ProfileActions.loadProfilesSuccess,
    (state: State, action): State => {
      return {
        ...state,
        currentUser: action.data,
      };
    },
  ),
  on(
    ProfileActions.loadProfilesFailure,
    (state: State, action): State => {
      return {
        ...state,
        currentUser: null,
      };
    },
  ),
);
