import { MediaItem } from '../ngrx/types';

export interface MovieResponse {
  popular?: {
    movies: MediaItem[];
    page: number;
    total_pages: number;
  };
  trending?: {
    movies: MediaItem[];
    page: number;
    total_pages: number;
  };
  nowPlaying?: {
    movies: MediaItem[];
    page: number;
    total_pages: number;
  };
  topRated?: {
    movies: MediaItem[];
    page: number;
    total_pages: number;
  };
  upcoming?: {
    movies: MediaItem[];
    page: number;
    total_pages: number;
  };
  movieDetails?: MediaItem;
}

export interface TvSeriesResponse {
  popular?: {
    tvSeries: MediaItem[];
    page: number;
    total_pages: number;
  };
  trending?: {
    tvSeries: MediaItem[];
    page: number;
    total_pages: number;
  };
  onTheAir?: {
    tvSeries: MediaItem[];
    page: number;
    total_pages: number;
  };
  topRated?: {
    tvSeries: MediaItem[];
    page: number;
    total_pages: number;
  };
  airingToday?: {
    tvSeries: MediaItem[];
    page: number;
    total_pages: number;
  };
  tvSeriesDetails?: MediaItem;
}
