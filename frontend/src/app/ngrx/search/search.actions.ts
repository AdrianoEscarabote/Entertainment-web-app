import { createAction, props } from '@ngrx/store';
import { MediaItem } from '../types';

export const setSearchTerm = createAction(
  '[Search] Set Search Term',
  props<{ searchTerm: string }>()
);

export const loadSearchResults = createAction(
  '[Search] Load Results',
  props<{ searchTerm: string }>()
);

export const loadSearchResultsSuccess = createAction(
  '[Search] Load Results Success',
  props<{
    results: { results: MediaItem[]; page: number; total_pages: number };
  }>()
);

export const clearSearchResults = createAction('[Search] Clear Results');
