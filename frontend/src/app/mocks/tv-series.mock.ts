import { MediaItem } from '../ngrx/types';

export const mockTvSeries: MediaItem = {
  category: 'tv',
  imdb_id: '',
  is_bookmarked: false,
  media_type: 'tv',
  rating: '8.9',
  release_date: '2008-01-20',
  runtime: '47',
  title: 'Breaking Bad',
  year: 2008,
  backdrop_path: '/gc8PfyTqzqltKPW3X0cIVUGmagz.jpg',
  first_air_date: '2008-01-20',
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
  homepage: 'https://www.sonypictures.com/tv/breakingbad',
  id: '1396',
  last_air_date: '2013-09-29',
  name: 'Breaking Bad',
  number_of_episodes: 62,
  number_of_seasons: 5,
  original_language: 'en',
  overview:
    "Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family's financial future at any cost as he enters the dangerous world of drugs and crime.",
  poster_path: '/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg',
  production_companies: [
    {
      id: '11073',
      logo_path: '/aCbASRcI1MI7DXjPbSW9Fcv9uGR.png',
      name: 'Sony Pictures Television',
      origin_country: 'US',
    },
    {
      id: '33742',
      logo_path: '/2jdh2sEa0R6y6uT0F7g0IgA2WO8.png',
      name: 'High Bridge Productions',
      origin_country: 'US',
    },
    {
      id: '2605',
      logo_path: 'null',
      name: 'Gran Via Productions',
      origin_country: 'US',
    },
  ],
  status: 'Ended',
  tagline: 'Change the equation.',
  vote_average: 8.926,
};
