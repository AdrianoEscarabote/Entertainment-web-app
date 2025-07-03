import { createReducer, on } from '@ngrx/store';
import { BookmarkState } from '../types';
import { addBookmark, LoadBookmarks, removeBookmark } from './bookmark.actions';

const initialState: BookmarkState = {
  movies: [],
  tvSeries: [],
};

export const bookmarkReducer = createReducer(
  initialState,
  on(LoadBookmarks, (state, { movies, tvSeries }) => {
    return {
      ...state,
      movies: movies || [],
      tvSeries: tvSeries || [],
    };
  }),
  on(addBookmark, (state, { mediaType, id }) => {
    if (mediaType === 'movies') {
      return {
        ...state,
        movies: [...state.movies, id],
      };
    }
    return {
      ...state,
      tvSeries: [...state.tvSeries, id],
    };
  }),
  on(removeBookmark, (state, { mediaType, id }) => {
    if (mediaType === 'movies') {
      return {
        ...state,
        movies: state.movies.filter((m) => m !== id),
      };
    }
    return {
      ...state,
      tvSeries: state.tvSeries.filter((s) => s !== id),
    };
  })
);
