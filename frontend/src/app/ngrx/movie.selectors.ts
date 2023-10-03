import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MovieState } from './movie.reducer';

export const selectMovieState = createFeatureSelector<MovieState>('movie');

export const selectMovies = createSelector(
  selectMovieState,
  (state: MovieState) => state.movies
);

export const selectSearchTerm = createSelector(
  selectMovieState,
  (state) => state.searchTerm
);
