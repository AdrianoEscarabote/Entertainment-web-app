import { createReducer, on } from '@ngrx/store';
import {
  loadMovieDetails,
  loadNowPlayingMovies,
  loadPopularMovies,
  loadTopRatedMovies,
  loadTrendingMovies,
  loadUpcomingMovies,
} from './movie.actions';
import { AppState } from '../types';

export const initialState: AppState = {
  movies: {
    popular: [],
    trending: [],
    nowPlaying: [],
    upcoming: [],
    topRated: [],
    movieDetails: null,
  },
  searchTerm: '',
};

export const movieReducer = createReducer(
  initialState,
  on(loadPopularMovies, (state, { popular }) => ({
    ...state,
    movies: {
      ...state.movies,
      popular: popular,
    },
  })),
  on(loadTrendingMovies, (state, { trending }) => ({
    ...state,
    movies: {
      ...state.movies,
      trending: trending,
    },
  })),
  on(loadNowPlayingMovies, (state, { nowPlaying }) => ({
    ...state,
    movies: {
      ...state.movies,
      nowPlaying: nowPlaying,
    },
  })),
  on(loadTopRatedMovies, (state, { topRated }) => ({
    ...state,
    movies: {
      ...state.movies,
      topRated: topRated,
    },
  })),
  on(loadMovieDetails, (state, { movieDetails }) => ({
    ...state,
    movies: {
      ...state.movies,
      movieDetails: movieDetails,
    },
  })),
  on(loadUpcomingMovies, (state, { upcoming }) => ({
    ...state,
    movies: {
      ...state.movies,
      upcoming: upcoming,
    },
  }))
);
