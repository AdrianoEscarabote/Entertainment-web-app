import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BookmarkState } from '../types';

export const selectBookmarkState =
  createFeatureSelector<BookmarkState>('bookmarks');

export const selectBookmarkedMovies = createSelector(
  selectBookmarkState,
  (state) => state.movies
);

export const selectBookmarkedTvSeries = createSelector(
  selectBookmarkState,
  (state) => state.tvSeries
);

export const selectBookmarks = createSelector(
  selectBookmarkState,
  (state) => state
);
