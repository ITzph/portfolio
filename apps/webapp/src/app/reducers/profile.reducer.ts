import { createReducer, on } from '@ngrx/store';
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
    ProfileActions.setProfile,
    (state: State, prop): State => {
      return {
        ...state,
        currentUser: prop.profile,
      };
    },
  ),
  on(
    ProfileActions.updateSkills,
    (state: State, prop): State => {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          skills: prop.skills,
        },
      };
    },
  ),
  on(
    ProfileActions.updateExperience,
    (state: State, prop): State => {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          experiences: prop.experiences,
        },
      };
    },
  ),
  on(
    ProfileActions.updateProfile,
    (state: State, prop): State => {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...prop.profile,
        },
      };
    },
  ),
);
