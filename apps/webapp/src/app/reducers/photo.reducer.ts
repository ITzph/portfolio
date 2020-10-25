import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as MemeActions from '../actions/meme.actions';
import { IImageMetadata } from '@portfolio/api-interfaces';

export const memesFeatureKey = 'memes';

export interface State extends EntityState<IImageMetadata> {
  // additional entities state properties
}

export const adapter: EntityAdapter<IImageMetadata> = createEntityAdapter<IImageMetadata>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(MemeActions.addMeme, (state, action) => adapter.addOne(action.meme, state)),
  on(MemeActions.upsertMeme, (state, action) => adapter.upsertOne(action.meme, state)),
  on(MemeActions.addMemes, (state, action) => adapter.addMany(action.memes, state)),
  on(MemeActions.upsertMemes, (state, action) => adapter.upsertMany(action.memes, state)),
  on(MemeActions.updateMeme, (state, action) => adapter.updateOne(action.meme, state)),
  on(MemeActions.updateMemes, (state, action) => adapter.updateMany(action.memes, state)),
  on(MemeActions.deleteMeme, (state, action) => adapter.removeOne(action.id, state)),
  on(MemeActions.deleteMemes, (state, action) => adapter.removeMany(action.ids, state)),
  on(MemeActions.loadMemes, (state, action) => adapter.setAll(action.memes, state)),
  on(MemeActions.clearMemes, (state) => adapter.removeAll(state)),
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
