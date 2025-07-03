import { createAction, props } from '@ngrx/store';

export const addBookmark = createAction(
  '[Bookmark] Add',
  props<{ mediaType: 'movies' | 'tv-series'; id: number }>()
);

export const removeBookmark = createAction(
  '[Bookmark] Remove',
  props<{ mediaType: 'movies' | 'tv-series'; id: number }>()
);
