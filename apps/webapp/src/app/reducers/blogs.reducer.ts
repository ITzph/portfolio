import { Action, createReducer, on } from '@ngrx/store';

export const blogsFeatureKey = 'blogs';
import { BlogMetadata, createBlog, BlogsAction } from '../actions/blogs.actions';

export interface State {
  blogs: BlogMetadata[];
}

export const initialState: State = {
  blogs: [
    {
      content: 'testValue',
    },
  ],
};

export const reducer = createReducer(
  initialState,
  on(createBlog, (state: State, prop) => {
    return {
      ...state,
      blogs: [...state.blogs, prop],
    };
  }),
);
