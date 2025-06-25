import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MovieState } from '../types';

export const selectMovieState = createFeatureSelector<MovieState>('movies');

export const selectPopularMovies = createSelector(
  selectMovieState,
  (state) => state.popular.movies
);

export const selectTrendingMovies = createSelector(
  selectMovieState,
  (state) => state.trending.movies
);

export const selectNowPlayingMovies = createSelector(
  selectMovieState,
  (state) => state.nowPlaying.movies
);

export const selectUpcomingMovies = createSelector(
  selectMovieState,
  (state) => state.upcoming.movies
);

export const selectTopRatedMovies = createSelector(
  selectMovieState,
  (state) => state.topRated.movies
);

export const selectMovieDetails = createSelector(
  selectMovieState,
  (state) => state.movieDetails
);

export const selectMoviesGenresList = createSelector(
  selectMovieState,
  (state) => state.genresList
);

export const selectMoviesByGenre = createSelector(
  selectMovieState,
  (state) => state.moviesByGenre
);
