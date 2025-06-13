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

export interface AppState {
  movies: {
    popular: MediaItem[];
    trending: MediaItem[];
    nowPlaying: MediaItem[];
    upcoming: MediaItem[];
    topRated: MediaItem[];
    movieDetails: MediaItem | null;
  };
  searchTerm: string;
}
