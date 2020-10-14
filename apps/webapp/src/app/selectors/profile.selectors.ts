import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserExperience } from '@portfolio/api-interfaces';
import * as fromProfile from '../reducers/profile.reducer';

export const selectProfileState = createFeatureSelector<fromProfile.State>(
  fromProfile.profileFeatureKey,
);

export const getCurrentUser = createSelector(selectProfileState, (state) => {
  return state.currentUser;
});

export const getExperiences = createSelector(selectProfileState, (state): IUserExperience[] => {
  return getCurrentUser.projector(state)?.experiences || [];
});
