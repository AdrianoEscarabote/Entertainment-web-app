import { MediaItem } from '../ngrx/types';

export const mockMovie: MediaItem = {
  category: 'movie',
  first_air_date: '',
  name: 'The Godfather',
  is_bookmarked: false,
  last_air_date: '',
  media_type: 'movie',
  number_of_episodes: 0,
  number_of_seasons: 0,
  rating: '8.7',
  year: 1972,
  backdrop_path: '/tmU7GeKVybMWFButWEGl2M4GeiP.jpg',
  genres: [
    {
      id: 18,
      name: 'Drama',
    },
    {
      id: 80,
      name: 'Crime',
    },
  ],
  homepage: 'http://www.thegodfather.com/',
  id: '238',
  imdb_id: 'tt0068646',
  original_language: 'en',
  overview:
    'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.',
  poster_path: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
  production_companies: [
    {
      id: '4',
      logo_path: '/gz66EfNoYPqHTYI4q9UEN4CbHRc.png',
      name: 'Paramount Pictures',
      origin_country: 'US',
    },
    {
      id: '10211',
      logo_path: 'null',
      name: 'Alfran Productions',
      origin_country: 'US',
    },
  ],
  release_date: '1972-03-14',
  runtime: '175',
  status: 'Released',
  tagline: "An offer you can't refuse.",
  title: 'The Godfather',
  vote_average: 8.687,
};
