import { createReducer, on } from '@ngrx/store';
import * as SearchActions from './search.actions';
import { SearchState } from '../types';

export const initialState: SearchState = {
  searchTerm: '',
  results: {
    results: [],
    page: 1,
    totalPages: 1,
  },
  loading: false,
};

export const searchReducer = createReducer(
  initialState,
  on(SearchActions.setSearchTerm, (state, { searchTerm }) => ({
    ...state,
    searchTerm,
  })),
  on(SearchActions.loadSearchResults, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SearchActions.loadSearchResultsSuccess, (state, { results }) => ({
    ...state,
    results: {
      results: results.results,
      page: results.page,
      totalPages: results.totalPages,
    },
    loading: false,
  })),
  on(SearchActions.clearSearchResults, () => ({
    loading: false,
    searchTerm: '',
    results: {
      results: [],
      page: 1,
      totalPages: 1,
    },
  }))
);
