import { createAction, props } from '@ngrx/store';
import { Genre, MediaItem } from '../types';

export const loadAllTvSeriesSuccess = createAction(
  '[TV Series API] Load All TV Series Success',
  props<{
    data: {
      [category: string]: {
        tvSeries: MediaItem[];
        page: number;
        total_pages: number;
      };
    };
  }>()
);

export const loadTrendingTvSeries = createAction(
  '[TV Series] Load Trending Success',
  props<{
    trending: { page: number; total_pages: number; tvSeries: MediaItem[] };
  }>()
);

export const loadPopularTvSeries = createAction(
  '[TV Series] Load Popular Success',
  props<{
    popular: { page: number; total_pages: number; tvSeries: MediaItem[] };
  }>()
);

export const loadOnTheAirTvSeries = createAction(
  '[TV Series] Load On The Air Success',
  props<{
    onTheAir: { page: number; total_pages: number; tvSeries: MediaItem[] };
  }>()
);

export const loadTopRatedTvSeries = createAction(
  '[TV Series] Load Top Rated Success',
  props<{
    topRated: { page: number; total_pages: number; tvSeries: MediaItem[] };
  }>()
);

export const loadAiringTodayTvSeries = createAction(
  '[TV Series] Load Airing Today Success',
  props<{
    airingToday: { page: number; total_pages: number; tvSeries: MediaItem[] };
  }>()
);

export const loadTvSeriesDetails = createAction(
  '[TV Series API] Load TV Series Details Success',
  props<{ tvSeriesDetails: MediaItem }>()
);

export const loadTvSeriesGenresList = createAction(
  '[TV Series API] Load Genres List Success',
  props<{ genresList: Genre[] }>()
);

export const loadTvSeriesByGenreSuccess = createAction(
  '[TV Series] Load TV Series By Genre Success',
  props<{
    genre: string;
    currentPage: number;
    totalPages: number;
    tvSeries: MediaItem[];
  }>()
);
