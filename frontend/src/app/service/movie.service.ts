import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { mergeMap } from 'rxjs/operators';
import { loadMoviesSuccess } from '../ngrx/movie.actions';
import { forkJoin, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private movieDataUrl = '../../assets/data.json';
  private getBookmarkedShowsUrl =
    'https://real-erin-cow-boot.cyclic.app/bookmark/get';
  constructor(private http: HttpClient, private store: Store) {}

  async getMovies(): Promise<void> {
    const bookmarkedShowsRequest = this.http.get<string[]>(
      this.getBookmarkedShowsUrl,
      {
        withCredentials: true,
      }
    );
    const moviesDataRequest = this.http.get<any[]>(this.movieDataUrl);

    forkJoin([bookmarkedShowsRequest, moviesDataRequest])
      .pipe(
        mergeMap(([bookmarkedShows, moviesData]) => {
          const moviesWithBookmark = moviesData.map((movie) => ({
            ...movie,
            isBookmarked: bookmarkedShows.includes(movie.title),
          }));

          // Dispatch the action and return it as an Observable
          this.store.dispatch(
            loadMoviesSuccess({ movies: moviesWithBookmark })
          );
          return of(null);
        })
      )
      .subscribe();
  }
}
