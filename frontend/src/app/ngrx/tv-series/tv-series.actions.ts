import { createAction, props } from '@ngrx/store';
import { MediaItem } from '../types';

export const loadTrendingTvSeries = createAction(
  '[TV Series] Load Trending Success',
  props<{ trending: MediaItem[] }>()
);

export const loadPopularTvSeries = createAction(
  '[TV Series] Load Popular Success',
  props<{ popular: MediaItem[] }>()
);

export const loadOnTheAirTvSeries = createAction(
  '[TV Series] Load On The Air Success',
  props<{ onTheAir: MediaItem[] }>()
);

export const loadTopRatedTvSeries = createAction(
  '[TV Series] Load Top Rated Success',
  props<{ topRated: MediaItem[] }>()
);

export const loadAiringTodayTvSeries = createAction(
  '[TV Series] Load Airing Today Success',
  props<{ airingToday: MediaItem[] }>()
);

export const loadTvSeriesDetails = createAction(
  '[TV Series API] Load TV Series Details Success',
  props<{ tvSeriesDetails: MediaItem }>()
);
