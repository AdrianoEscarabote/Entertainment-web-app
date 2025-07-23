import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchState } from '../types';

export const selectSearchState = createFeatureSelector<SearchState>('search');

export const selectSearchTerm = createSelector(
  selectSearchState,
  (state) => state.searchTerm
);

export const selectSearchResults = createSelector(
  selectSearchState,
  (state) => state.results.results
);

export const selectSearchPage = createSelector(
  selectSearchState,
  (state) => state.results.page
);

export const selectSearchTotalPages = createSelector(
  selectSearchState,
  (state) => state.results.totalPages
);

export const selectSearchLoading = createSelector(
  selectSearchState,
  (state) => state.loading
);
