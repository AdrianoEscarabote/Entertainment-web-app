import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { environment } from 'src/environments/environment';
import { loadAllMovieCategoriesSuccess } from '../ngrx/movie/movie.actions';
import { MediaItem } from '../ngrx/types';
import { MovieResponse } from './service.interfaces';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private movieDataUrl = `${environment.apiUrl}/movies`;
  private getBookmarkedShowsUrl = `${environment.apiUrl}/bookmark/get`;

  constructor(private http: HttpClient, private store: Store) {}

  async getAllMedia(): Promise<void> {
    const movieTypes = [
      'popular',
      'trending',
      'now-playing',
      'upcoming',
      'top-rated',
    ];

    const movieRequest$ = this.http.post<MovieResponse>(
      this.movieDataUrl,
      { types: movieTypes, page: 1 },
      { withCredentials: true }
    );

    movieRequest$.subscribe(
      (movies) => {
        this.store.dispatch(
          loadAllMovieCategoriesSuccess({ data: movies as any })
        );
      },
      (error: any) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  getMoviesByGenre(genreId: number, page: number) {
    return this.http.get<{ results: MediaItem[]; total_pages: number }>(
      `${this.movieDataUrl}/genre/${genreId}?page=${page}`,
      { withCredentials: true }
    );
  }

  getMoviesWithGenre(genre: string, page: number) {
    return this.http.post(
      `${this.movieDataUrl}/by-genre`,
      {
        genre: [genre],
        page: page,
      },
      { withCredentials: true }
    );
  }

  getMoviesByType(types: string[], page: number) {
    return this.http.post<{
      movies: MovieResponse;
      page: number;
      total_pages: number;
    }>(`${this.movieDataUrl}`, { types, page }, { withCredentials: true });
  }

  getMovieDetails(id: string) {
    return this.http.post(
      this.movieDataUrl,
      { movie_id: id, types: ['movie-details'] },
      { withCredentials: true }
    );
  }

  getMoviesGenreList() {
    return this.http.get(`${this.movieDataUrl}/genre-list`, {
      withCredentials: true,
    });
  }
}
