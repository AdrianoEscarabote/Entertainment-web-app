import { createReducer, on } from '@ngrx/store';
import { loadMoviesSuccess, setSearchTerm } from './movie.actions';

interface Thumbnail {
  small: string;
  large: string;
  medium: string;
}

interface Regular {
  small: string;
  medium: string;
  large: string;
}

export interface MovieTypes {
  title: string;
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
  thumbnail: {
    trending: Thumbnail;
    regular: Regular;
  };
}

export interface MovieState {
  movies: MovieTypes[];
  searchTerm: string;
}

export const initialState: MovieState = {
  movies: [],
  searchTerm: '',
};

export const movieReducer = createReducer(
  initialState,
  on(loadMoviesSuccess, (state, { movies }) => ({
    ...state,
    movies,
  })),
  on(setSearchTerm, (state, { searchTerm }) => ({
    ...state,
    searchTerm,
  }))
);
