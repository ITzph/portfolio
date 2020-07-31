import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProfile from '../reducers/profile.reducer';

export const selectProfileState = createFeatureSelector<fromProfile.State>(
  fromProfile.profileFeatureKey,
);

export const getCurrentUser = createSelector(selectProfileState, (state) => {
  return state.currentUser;
});
