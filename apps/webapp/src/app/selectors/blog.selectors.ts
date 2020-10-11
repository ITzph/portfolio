import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Blog } from '@portfolio/api-interfaces';

import * as fromBlogs from '../reducers/blog.reducer';

export const selectBlogsState = createFeatureSelector<fromBlogs.State>(fromBlogs.blogsFeatureKey);

export const getPublishedBlogs = createSelector(selectBlogsState, (state): Blog[] => {
  return fromBlogs
    .selectAll(state)
    .filter((blog) => blog.published)
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
});

export const getAllBlogs = createSelector(selectBlogsState, (state): Blog[] => {
  return fromBlogs.selectAll(state).sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
});
