import { createReducer, on } from '@ngrx/store';
import {
  loadMovieDetailsSuccess,
  loadNowPlayingSuccess,
  loadPopularSuccess,
  loadTopRatedMovies,
  loadTrendingSuccess,
  loadUpcomingMovies,
} from './movie.actions';

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: string;
  logo_path: string;
  name: string;
  origin_country: string;
}
export interface MediaItem {
  id: string;
  title: string;
  tagline: string;
  is_bookmarked: boolean;
  rating: string;
  release_date: string;
  overview: string;
  genres: Genre[];
  imdb_id: string;
  homepage: string;
  runtime: string;
  original_language: string;
  status: string;
  vote_average: number;
  production_companies: ProductionCompany[];
  media_type: 'movie' | 'tv';
  backdrop_path: string;
  poster_path: string;
  year: number;
  category: string;
}

export interface AppState {
  movies: {
    popular: MediaItem[];
    trending: MediaItem[];
    nowPlaying: MediaItem[];
    upcoming: MediaItem[];
    topRated: MediaItem[];
    movieDetails: MediaItem | null;
  };
  searchTerm: string;
}

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
  on(loadPopularSuccess, (state, { popular }) => ({
    ...state,
    movies: {
      ...state.movies,
      popular: popular,
    },
  })),
  on(loadTrendingSuccess, (state, { trending }) => ({
    ...state,
    movies: {
      ...state.movies,
      trending: trending,
    },
  })),
  on(loadNowPlayingSuccess, (state, { nowPlaying }) => ({
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
  on(loadMovieDetailsSuccess, (state, { movieDetails }) => ({
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
