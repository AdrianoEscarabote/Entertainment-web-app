import { createAction, props } from '@ngrx/store';

export const loadMoviesSuccess = createAction(
  '[Movie API] Load Movies Success',
  props<{ movies: any[] }>()
);
