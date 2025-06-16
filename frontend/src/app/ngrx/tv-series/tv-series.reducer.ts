import { createReducer, on } from '@ngrx/store';
import {
  loadTrendingTvSeries,
  loadPopularTvSeries,
  loadOnTheAirTvSeries,
  loadAiringTodayTvSeries,
  loadTopRatedTvSeries,
  loadTvSeriesDetails,
} from './tv-series.actions';
import { TvSeriesState } from '../types';

export const initialState: TvSeriesState = {
  popular: [],
  trending: [],
  onTheAir: [],
  topRated: [],
  airingToday: [],
  tvSeriesDetails: null,
};

export const tvSeriesReducer = createReducer(
  initialState,
  on(loadTrendingTvSeries, (state, { trending }) => ({
    ...state,
    trending: trending,
  })),
  on(loadPopularTvSeries, (state, { popular }) => ({
    ...state,
    popular: popular,
  })),
  on(loadOnTheAirTvSeries, (state, { onTheAir }) => ({
    ...state,
    onTheAir: onTheAir,
  })),
  on(loadTopRatedTvSeries, (state, { topRated }) => ({
    ...state,
    topRated: topRated,
  })),
  on(loadAiringTodayTvSeries, (state, { airingToday }) => ({
    ...state,
    airingToday: airingToday,
  })),
  on(loadTvSeriesDetails, (state, { tvSeriesDetails }) => ({
    ...state,
    tvSeriesDetails: tvSeriesDetails,
  }))
);
