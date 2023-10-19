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
    try {
      const bookmarkedShows = await this.http
        .get<string[]>(this.getBookmarkedShowsUrl, {
          withCredentials: true,
        })
        .toPromise();

      const moviesData = await this.http
        .get<any[]>(this.movieDataUrl)
        .toPromise();

      const moviesWithBookmark = moviesData?.map((movie) => ({
        ...movie,
        isBookmarked: bookmarkedShows?.includes(movie.title),
      }));

      this.store.dispatch(loadMoviesSuccess({ movies: moviesWithBookmark! }));
    } catch (error) {
      console.error(error);
    }
  }
}
