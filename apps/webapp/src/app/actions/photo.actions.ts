import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { IImageMetadata } from '@portfolio/api-interfaces';

export const loadMemes = createAction(
  '[Meme/API] Load Memes',
  props<{ memes: IImageMetadata[] }>(),
);

export const addMeme = createAction('[Meme/API] Add Meme', props<{ meme: IImageMetadata }>());

export const upsertMeme = createAction('[Meme/API] Upsert Meme', props<{ meme: IImageMetadata }>());

export const addMemes = createAction('[Meme/API] Add Memes', props<{ memes: IImageMetadata[] }>());

export const upsertMemes = createAction(
  '[Meme/API] Upsert Memes',
  props<{ memes: IImageMetadata[] }>(),
);

export const updateMeme = createAction(
  '[Meme/API] Update Meme',
  props<{ meme: Update<IImageMetadata> }>(),
);

export const updateMemes = createAction(
  '[Meme/API] Update Memes',
  props<{ memes: Update<IImageMetadata>[] }>(),
);

export const deleteMeme = createAction('[Meme/API] Delete Meme', props<{ id: number }>());

export const deleteMemes = createAction('[Meme/API] Delete Memes', props<{ ids: number[] }>());

export const clearMemes = createAction('[Meme/API] Clear Memes');
