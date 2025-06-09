import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import {
  loadNowPlayingSuccess,
  loadPopularSuccess,
  loadTrendingSuccess,
} from '../ngrx/movie.actions';
import { environment } from 'src/environments/environment';
import { MovieTypes } from '../ngrx/movie.reducer';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private movieDataUrl = `${environment.apiUrl}/movies`;
  private getBookmarkedShowsUrl = `${environment.apiUrl}/bookmark/get`;

  constructor(private http: HttpClient, private store: Store) {}

  getMoviesByType(type: 'popular' | 'trending' | 'now-playing') {
    return this.http.post<{ movies: MovieTypes[]; success: boolean }>(
      `${this.movieDataUrl}`,
      { type },
      { withCredentials: true }
    );
  }

  loadPopularMovies(): void {
    this.getMoviesByType('popular').subscribe(({ movies }) => {
      this.store.dispatch(loadPopularSuccess({ movies }));
    });
  }

  loadTrendingMovies(): void {
    this.getMoviesByType('trending').subscribe(({ movies }) => {
      this.store.dispatch(loadTrendingSuccess({ movies }));
    });
  }

  loadNowPlayingMovies(): void {
    this.getMoviesByType('now-playing').subscribe(({ movies }) => {
      this.store.dispatch(loadNowPlayingSuccess({ movies }));
    });
  }

  async getMovies(): Promise<void> {
    const bookmarkedShowsRequest = this.http.get<string[]>(
      this.getBookmarkedShowsUrl,
      {
        withCredentials: true,
      }
    );
  }
}
