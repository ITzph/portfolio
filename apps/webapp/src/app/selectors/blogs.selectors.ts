import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromBlogs from '../reducers/blogs.reducer';

export const selectBlogsState = createFeatureSelector<fromBlogs.State>(fromBlogs.blogsFeatureKey);

export const getBlogs = createSelector(selectBlogsState, (state) => {
  return state.blogs;
});
