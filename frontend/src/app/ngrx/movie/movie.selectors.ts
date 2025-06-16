import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MovieState } from '../types';

export const selectMovieState = createFeatureSelector<MovieState>('movies');

export const selectPopularMovies = createSelector(
  selectMovieState,
  (state) => state.popular
);

export const selectTrendingMovies = createSelector(
  selectMovieState,
  (state) => state.trending
);

export const selectNowPlayingMovies = createSelector(
  selectMovieState,
  (state) => state.trending
);

export const selectUpcomingMovies = createSelector(
  selectMovieState,
  (state) => state.upcoming
);

export const selectTopRatedMovies = createSelector(
  selectMovieState,
  (state) => state.topRated
);

export const selectMovieDetails = createSelector(
  selectMovieState,
  (state) => state.movieDetails
);

export const selectMoviesGenresList = createSelector(
  selectMovieState,
  (state) => state.genresList
);
