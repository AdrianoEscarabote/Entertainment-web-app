import { ActionReducerMap } from '@ngrx/store';
import { tvSeriesReducer } from './tv-series/tv-series.reducer';
import { AppState } from './types';
import { movieReducer } from './movie/movie.reducer';
import { bookmarkReducer } from './bookmark/bookmark.reducer';

export const reducers: ActionReducerMap<AppState> = {
  movies: movieReducer,
  tvSeries: tvSeriesReducer,
  bookmarks: bookmarkReducer,
};
