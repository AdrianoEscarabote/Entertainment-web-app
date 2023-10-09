import { createAction, props } from '@ngrx/store';

export const loadMoviesSuccess = createAction(
  '[Movie API] Load Movies Success',
  props<{ movies: any[] }>()
);

export const setSearchTerm = createAction(
  '[Movies] Set Search Term',
  props<{ searchTerm: string }>()
);

export const resetMovies = createAction('[Movies] Reset Movies');
