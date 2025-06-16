import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, TvSeriesState } from '../types';

export const selectTvSeries = createFeatureSelector<TvSeriesState>('tvSeries');

export const selectTrendingTvSeries = createSelector(
  selectTvSeries,
  (state) => state.trending
);

export const selectPopularTvSeries = createSelector(
  selectTvSeries,
  (state) => state.popular
);

export const selectOnTheAirTvSeries = createSelector(
  selectTvSeries,
  (state) => state.onTheAir
);

export const selectTopRatedTvSeries = createSelector(
  selectTvSeries,
  (state) => state.topRated
);

export const selectAiringTodayTvSeries = createSelector(
  selectTvSeries,
  (state) => state.airingToday
);

export const selectTvSeriesDetails = createSelector(
  selectTvSeries,
  (state) => state.tvSeriesDetails
);
