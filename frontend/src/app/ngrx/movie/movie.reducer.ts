import { createReducer, on } from '@ngrx/store';
import {
  loadMoviesGenresList,
  loadMovieDetails,
  loadNowPlayingMovies,
  loadPopularMovies,
  loadTopRatedMovies,
  loadTrendingMovies,
  loadUpcomingMovies,
  loadMoviesByGenreSuccess,
  loadAllMovieCategoriesSuccess,
} from './movie.actions';
import { MovieState } from '../types';

export const initialState: MovieState = {
  popular: {
    movies: [],
    page: 1,
    total_pages: 1,
  },
  trending: {
    movies: [],
    page: 1,
    total_pages: 1,
  },
  nowPlaying: {
    movies: [],
    page: 1,
    total_pages: 1,
  },
  upcoming: {
    movies: [],
    page: 1,
    total_pages: 1,
  },
  topRated: {
    movies: [],
    page: 1,
    total_pages: 1,
  },
  genresList: [],
  movieDetails: null,
  moviesByGenre: {
    genre: '',
    currentPage: 1,
    totalPages: 1,
    movies: [],
  },
};

export const movieReducer = createReducer(
  initialState,
  on(loadAllMovieCategoriesSuccess, (state, { data }) => {
    const newState = { ...state };

    type MovieCategory =
      | 'popular'
      | 'trending'
      | 'nowPlaying'
      | 'upcoming'
      | 'topRated';

    for (const category in data) {
      if (
        ['popular', 'trending', 'nowPlaying', 'upcoming', 'topRated'].includes(
          category
        )
      ) {
        newState[category as MovieCategory] = {
          movies: data[category].movies,
          page: data[category].page,
          total_pages: data[category].total_pages,
        };
      }
    }

    return newState;
  }),
  on(loadPopularMovies, (state, { popular }) => ({
    ...state,
    popular: {
      movies: popular.movies,
      page: popular.page,
      total_pages: popular.total_pages,
    },
  })),
  on(loadTrendingMovies, (state, { trending }) => ({
    ...state,
    trending: {
      movies: trending.movies,
      page: trending.page,
      total_pages: trending.total_pages,
    },
  })),
  on(loadNowPlayingMovies, (state, { nowPlaying }) => ({
    ...state,
    nowPlaying: {
      movies: nowPlaying.movies,
      page: nowPlaying.page,
      total_pages: nowPlaying.total_pages,
    },
  })),
  on(loadTopRatedMovies, (state, { topRated }) => ({
    ...state,
    topRated: {
      movies: topRated.movies,
      page: topRated.page,
      total_pages: topRated.total_pages,
    },
  })),
  on(loadUpcomingMovies, (state, { upcoming }) => ({
    ...state,
    upcoming: {
      movies: upcoming.movies,
      page: upcoming.page,
      total_pages: upcoming.total_pages,
    },
  })),
  on(loadMovieDetails, (state, { movieDetails }) => ({
    ...state,
    movieDetails: movieDetails,
  })),
  on(loadMoviesGenresList, (state, { genresList }) => ({
    ...state,
    genresList: genresList,
  })),
  on(
    loadMoviesByGenreSuccess,
    (state, { currentPage, genre, totalPages, movies }) => ({
      ...state,
      moviesByGenre: {
        genre: genre,
        currentPage: currentPage,
        totalPages: totalPages,
        movies: movies,
      },
    })
  )
);
