import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TvSeriesState } from '../types';

export const selectTvSeries = createFeatureSelector<TvSeriesState>('tvSeries');

export const selectTrendingTvSeries = createSelector(
  selectTvSeries,
  (state) => state.trending.tvSeries
);

export const selectPopularTvSeries = createSelector(
  selectTvSeries,
  (state) => state.popular.tvSeries
);

export const selectOnTheAirTvSeries = createSelector(
  selectTvSeries,
  (state) => state.onTheAir.tvSeries
);

export const selectTopRatedTvSeries = createSelector(
  selectTvSeries,
  (state) => state.topRated.tvSeries
);

export const selectAiringTodayTvSeries = createSelector(
  selectTvSeries,
  (state) => state.airingToday.tvSeries
);

export const selectTvSeriesDetails = createSelector(
  selectTvSeries,
  (state) => state.tvSeriesDetails
);

export const selectTvSeriesGenresList = createSelector(
  selectTvSeries,
  (state) => state.genresList
);

export const selectTvSeriesByGenre = createSelector(
  selectTvSeries,
  (state) => state.tvSeriesByGenre
);
