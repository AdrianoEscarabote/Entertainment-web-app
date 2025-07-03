export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: string;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface MediaItem {
  id: string;
  title: string;
  name: string;
  number_of_seasons: number;
  number_of_episodes: number;
  first_air_date: string;
  last_air_date: string;
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

export interface MovieState {
  popular: {
    page: number;
    total_pages: number;
    movies: MediaItem[];
  };
  trending: {
    page: number;
    total_pages: number;
    movies: MediaItem[];
  };
  nowPlaying: {
    page: number;
    total_pages: number;
    movies: MediaItem[];
  };
  upcoming: {
    page: number;
    total_pages: number;
    movies: MediaItem[];
  };
  topRated: {
    page: number;
    total_pages: number;
    movies: MediaItem[];
  };
  genresList: Genre[];
  movieDetails: MediaItem | null;

  moviesByGenre: {
    genre: string;
    currentPage: number;
    totalPages: number;
    movies: MediaItem[];
  };
}

export interface TvSeriesState {
  popular: {
    page: number;
    total_pages: number;
    tvSeries: MediaItem[];
  };
  trending: {
    page: number;
    total_pages: number;
    tvSeries: MediaItem[];
  };
  onTheAir: {
    page: number;
    total_pages: number;
    tvSeries: MediaItem[];
  };
  topRated: {
    page: number;
    total_pages: number;
    tvSeries: MediaItem[];
  };
  airingToday: {
    page: number;
    total_pages: number;
    tvSeries: MediaItem[];
  };
  genresList: Genre[];
  tvSeriesDetails: MediaItem | null;

  tvSeriesByGenre: {
    genre: string;
    currentPage: number;
    totalPages: number;
    tvSeries: MediaItem[];
  };
}

export interface BookmarkState {
  movies: number[];
  tvSeries: number[];
}

export interface AppState {
  movies: MovieState;
  tvSeries: TvSeriesState;
  bookmarks: BookmarkState;
}
