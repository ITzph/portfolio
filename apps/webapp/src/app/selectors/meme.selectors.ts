import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IImageMetadata } from '@portfolio/api-interfaces';
import * as fromMeme from '../reducers/meme.reducer';

export const selectBlogsState = createFeatureSelector<fromMeme.State>(fromMeme.memesFeatureKey);

export const getMemes = createSelector(selectBlogsState, (state): IImageMetadata[] => {
  return fromMeme.selectAll(state);
});
