import { createReducer, on } from '@ngrx/store';
import {
  loadTrendingTvSeries,
  loadPopularTvSeries,
  loadOnTheAirTvSeries,
  loadAiringTodayTvSeries,
  loadTopRatedTvSeries,
  loadTvSeriesDetails,
  loadTvSeriesGenresList,
  loadTvSeriesByGenreSuccess,
  loadAllTvSeriesSuccess,
} from './tv-series.actions';
import { TvSeriesState } from '../types';

export const initialState: TvSeriesState = {
  popular: {
    page: 0,
    total_pages: 0,
    tvSeries: [],
  },
  trending: {
    page: 0,
    total_pages: 0,
    tvSeries: [],
  },
  onTheAir: {
    page: 0,
    total_pages: 0,
    tvSeries: [],
  },
  topRated: {
    page: 0,
    total_pages: 0,
    tvSeries: [],
  },
  airingToday: {
    page: 0,
    total_pages: 0,
    tvSeries: [],
  },
  tvSeriesDetails: null,
  genresList: [],
  tvSeriesByGenre: {
    genre: '',
    currentPage: 0,
    totalPages: 0,
    tvSeries: [],
  },
};

export const tvSeriesReducer = createReducer(
  initialState,
  on(loadAllTvSeriesSuccess, (state, { data }) => {
    const newState = { ...state };

    type TvSeriesCategory =
      | 'popular'
      | 'trending'
      | 'onTheAir'
      | 'topRated'
      | 'airingToday';

    for (const category in data) {
      if (
        ['popular', 'trending', 'onTheAir', 'topRated', 'airingToday'].includes(
          category
        )
      ) {
        newState[category as TvSeriesCategory] = {
          tvSeries: data[category].tvSeries,
          page: data[category].page,
          total_pages: data[category].total_pages,
        };
      }
    }

    return newState;
  }),
  on(loadTrendingTvSeries, (state, { trending }) => ({
    ...state,
    trending: {
      page: trending.page,
      total_pages: trending.total_pages,
      tvSeries: trending.tvSeries,
    },
  })),
  on(loadPopularTvSeries, (state, { popular }) => ({
    ...state,
    popular: {
      page: popular.page,
      total_pages: popular.total_pages,
      tvSeries: popular.tvSeries,
    },
  })),
  on(loadOnTheAirTvSeries, (state, { onTheAir }) => ({
    ...state,
    onTheAir: {
      page: onTheAir.page,
      total_pages: onTheAir.total_pages,
      tvSeries: onTheAir.tvSeries,
    },
  })),
  on(loadTopRatedTvSeries, (state, { topRated }) => ({
    ...state,
    topRated: {
      page: topRated.page,
      total_pages: topRated.total_pages,
      tvSeries: topRated.tvSeries,
    },
  })),
  on(loadAiringTodayTvSeries, (state, { airingToday }) => ({
    ...state,
    airingToday: {
      page: airingToday.page,
      total_pages: airingToday.total_pages,
      tvSeries: airingToday.tvSeries,
    },
  })),
  on(loadTvSeriesDetails, (state, { tvSeriesDetails }) => ({
    ...state,
    tvSeriesDetails: tvSeriesDetails,
  })),
  on(loadTvSeriesGenresList, (state, { genresList }) => ({
    ...state,
    genresList: genresList,
  })),
  on(
    loadTvSeriesByGenreSuccess,
    (state, { currentPage, genre, totalPages, tvSeries }) => ({
      ...state,
      tvSeriesByGenre: {
        genre: genre,
        currentPage: currentPage,
        totalPages: totalPages,
        tvSeries: tvSeries,
      },
    })
  )
);
