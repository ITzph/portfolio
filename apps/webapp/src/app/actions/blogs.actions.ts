import { createAction, props } from '@ngrx/store';

export enum BlogsAction {
  CreateBLog = '[BLogs] Create',
  LoadBLog = '[BLogs] Load',
}

export interface BlogMetadata {
  content: string;
}

export const loadBlogs = createAction('[Blogs] Load');

export const createBlog = createAction('[Blogs] Create', props<BlogMetadata>());
