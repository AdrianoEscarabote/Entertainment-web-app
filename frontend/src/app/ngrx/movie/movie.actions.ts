import { createAction, props } from '@ngrx/store';
import { Genre, MediaItem } from '../types';

export const loadAllMovieCategoriesSuccess = createAction(
  '[Movie API] Load All Movie Categories Success',
  props<{
    data: {
      [category: string]: {
        movies: MediaItem[];
        page: number;
        total_pages: number;
      };
    };
  }>()
);

export const loadPopularMovies = createAction(
  '[Movie] Load Popular Success',
  props<{
    popular: { movies: MediaItem[]; page: number; total_pages: number };
  }>()
);

export const loadTrendingMovies = createAction(
  '[Movie] Load Trending Success',
  props<{
    trending: { movies: MediaItem[]; page: number; total_pages: number };
  }>()
);

export const loadNowPlayingMovies = createAction(
  '[Movie] Load Now Playing Success',
  props<{
    nowPlaying: { movies: MediaItem[]; page: number; total_pages: number };
  }>()
);

export const loadUpcomingMovies = createAction(
  '[Movie] Load Upcoming Movies',
  props<{
    upcoming: { movies: MediaItem[]; page: number; total_pages: number };
  }>()
);

export const loadTopRatedMovies = createAction(
  '[Movie] Load Top Rated Movies',
  props<{
    topRated: { movies: MediaItem[]; page: number; total_pages: number };
  }>()
);

export const loadMovieDetails = createAction(
  '[Movie API] Load Movie Details Success',
  props<{ movieDetails: MediaItem }>()
);

export const setSearchTerm = createAction(
  '[Movies] Set Search Term',
  props<{ searchTerm: string }>()
);

export const setBookmarkedShow = createAction(
  '[Show] set bookmarked show',
  props<{ title: string; isBookmarked: boolean }>()
);

export const loadMoviesGenresList = createAction(
  '[Movie API] Load Genres List Success',
  props<{ genresList: Genre[] }>()
);

export const loadMoviesByGenre = createAction(
  '[Movie] Load Movies By Genre',
  props<{ genre: string; page: number }>()
);

export const loadMoviesByGenreSuccess = createAction(
  '[Movie] Load Movies By Genre Success',
  props<{
    genre: string;
    currentPage: number;
    totalPages: number;
    movies: MediaItem[];
  }>()
);

export const resetMovies = createAction('[Movies] Reset Movies');
