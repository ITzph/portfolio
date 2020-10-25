import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IImageMetadata } from '@portfolio/api-interfaces';
import * as fromPhoto from '../reducers/photo.reducer';

export const selectBlogsState = createFeatureSelector<fromPhoto.State>(fromPhoto.photosFeatureKey);

export const getPhotos = createSelector(selectBlogsState, (state): IImageMetadata[] => {
  return fromPhoto.selectAll(state);
});
