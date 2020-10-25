import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { IImageMetadata } from '@portfolio/api-interfaces';

export const loadPhotos = createAction(
  '[Photo/API] Load Photos',
  props<{ photos: IImageMetadata[] }>(),
);

export const addPhoto = createAction('[Photo/API] Add Photo', props<{ photo: IImageMetadata }>());

export const upsertPhoto = createAction(
  '[Photo/API] Upsert Photo',
  props<{ photo: IImageMetadata }>(),
);

export const addPhotos = createAction(
  '[Photo/API] Add Photos',
  props<{ photos: IImageMetadata[] }>(),
);

export const upsertPhotos = createAction(
  '[Photo/API] Upsert Photos',
  props<{ photos: IImageMetadata[] }>(),
);

export const updatePhoto = createAction(
  '[Photo/API] Update Photo',
  props<{ photo: Update<IImageMetadata> }>(),
);

export const updatePhotos = createAction(
  '[Photo/API] Update Photos',
  props<{ photos: Update<IImageMetadata>[] }>(),
);

export const deletePhoto = createAction('[Photo/API] Delete Photo', props<{ id: number }>());

export const deletePhotos = createAction('[Photo/API] Delete Photos', props<{ ids: number[] }>());

export const clearPhotos = createAction('[Photo/API] Clear Photos');
