import { createAction, props } from '@ngrx/store';
import { MediaItem } from './movie.reducer';

export const loadPopularMovies = createAction(
  '[Movie] Load Popular Success',
  props<{ popular: MediaItem[] }>()
);

export const loadTrendingMovies = createAction(
  '[Movie] Load Trending Success',
  props<{ trending: MediaItem[] }>()
);

export const loadNowPlayingMovies = createAction(
  '[Movie] Load Now Playing Success',
  props<{ nowPlaying: MediaItem[] }>()
);

export const loadUpcomingMovies = createAction(
  '[Movie] Load Upcoming Movies',
  props<{ upcoming: MediaItem[] }>()
);

export const loadTopRatedMovies = createAction(
  '[Movie] Load Top Rated Movies',
  props<{ topRated: MediaItem[] }>()
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

export const resetMovies = createAction('[Movies] Reset Movies');
