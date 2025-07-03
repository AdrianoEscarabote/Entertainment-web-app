import { createAction, props } from '@ngrx/store';

export const addBookmark = createAction(
  '[Bookmark] Add',
  props<{ mediaType: 'movies' | 'tv-series'; id: string }>()
);

export const removeBookmark = createAction(
  '[Bookmark] Remove',
  props<{ mediaType: 'movies' | 'tv-series'; id: string }>()
);

export const LoadBookmarks = createAction(
  '[Bookmark] Load Bookmarks',
  props<{ movies: string[]; tvSeries: string[] }>()
);
