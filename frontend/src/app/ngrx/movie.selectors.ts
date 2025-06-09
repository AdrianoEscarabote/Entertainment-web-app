import { createSelector, createFeatureSelector, select } from '@ngrx/store';
import { AppState } from './movie.reducer';

export const selectMovieState = createFeatureSelector<AppState>('movie');

export const selectMovies = createSelector(
  selectMovieState,
  (state: AppState) => state.movies
);

export const selectSearchTerm = createSelector(
  selectMovieState,
  (state) => state.searchTerm
);

export const selectPopularMovies = createSelector(
  selectMovieState,
  (state) => state.movies.popular
);

export const selectTrendingMovies = createSelector(
  selectMovieState,
  (state) => state.movies.trending
);

export const selectNowPlayingMovies = createSelector(
  selectMovieState,
  (state) => state.movies.trending
);
