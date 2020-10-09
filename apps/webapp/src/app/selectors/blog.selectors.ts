import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Blog } from '@portfolio/api-interfaces';

import * as fromBlogs from '../reducers/blog.reducer';

export const selectBlogsState = createFeatureSelector<fromBlogs.State>(fromBlogs.blogsFeatureKey);

export const getBlogs = createSelector(selectBlogsState, (state): Blog[] => {
  return fromBlogs.selectAll(state).sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
});
