import { createSelector, createFeatureSelector } from '@ngrx/store';
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

export const selectUpcomingMovies = createSelector(
  selectMovieState,
  (state) => state.movies.upcoming
);

export const selectTopRatedMovies = createSelector(
  selectMovieState,
  (state) => state.movies.topRated
);

export const selectMovieDetails = createSelector(
  selectMovieState,
  (state) => state.movies.movieDetails
);
