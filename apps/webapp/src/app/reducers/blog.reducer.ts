import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as BlogActions from '../actions/blog.actions';
import { Blog } from '@portfolio/api-interfaces';

export const blogsFeatureKey = 'blogs';

export interface State extends EntityState<Blog> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Blog> = createEntityAdapter<Blog>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(BlogActions.addBlog, (state, action) => adapter.addOne(action.blog, state)),
  on(BlogActions.upsertBlog, (state, action) => adapter.upsertOne(action.blog, state)),
  on(BlogActions.addBlogs, (state, action) => adapter.addMany(action.blogs, state)),
  on(BlogActions.upsertBlogs, (state, action) => adapter.upsertMany(action.blogs, state)),
  on(BlogActions.updateBlog, (state, action) => adapter.updateOne(action.blog, state)),
  on(BlogActions.updateBlogs, (state, action) => adapter.updateMany(action.blogs, state)),
  on(BlogActions.deleteBlog, (state, action) => adapter.removeOne(action.id, state)),
  on(BlogActions.deleteBlogs, (state, action) => adapter.removeMany(action.ids, state)),
  on(BlogActions.loadBlogs, (state, action) => adapter.setAll(action.blogs, state)),
  on(BlogActions.clearBlogs, (state) => adapter.removeAll(state)),
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
