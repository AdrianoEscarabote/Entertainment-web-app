import { createReducer, on } from '@ngrx/store';
import {
  loadMoviesGenresList,
  loadMovieDetails,
  loadNowPlayingMovies,
  loadPopularMovies,
  loadTopRatedMovies,
  loadTrendingMovies,
  loadUpcomingMovies,
} from './movie.actions';
import { MovieState } from '../types';

export const initialState: MovieState = {
  popular: [],
  trending: [],
  nowPlaying: [],
  upcoming: [],
  topRated: [],
  genresList: [],
  movieDetails: null,
};

export const movieReducer = createReducer(
  initialState,
  on(loadPopularMovies, (state, { popular }) => ({
    ...state,
    popular: popular,
  })),
  on(loadTrendingMovies, (state, { trending }) => ({
    ...state,
    trending: trending,
  })),
  on(loadNowPlayingMovies, (state, { nowPlaying }) => ({
    ...state,
    nowPlaying: nowPlaying,
  })),
  on(loadTopRatedMovies, (state, { topRated }) => ({
    ...state,
    topRated: topRated,
  })),
  on(loadMovieDetails, (state, { movieDetails }) => ({
    ...state,
    movieDetails: movieDetails,
  })),
  on(loadUpcomingMovies, (state, { upcoming }) => ({
    ...state,
    upcoming: upcoming,
  })),
  on(loadMoviesGenresList, (state, { genresList }) => ({
    ...state,
    genresList: genresList,
  }))
);
