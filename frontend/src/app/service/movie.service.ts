import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { loadMoviesSuccess } from '../ngrx/movie.actions';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private movieDataUrl = '../../assets/data.json';
  private getBookmarkedShowsUrl =
    'https://real-erin-cow-boot.cyclic.app/bookmark/get';
  constructor(private http: HttpClient, private store: Store) {}

  getMovies(): void {
    let bookmarkedShows: string[] = [];

    this.http
      .get<string[]>(this.getBookmarkedShowsUrl, {
        withCredentials: true,
      })
      .subscribe((data) => {
        bookmarkedShows = data;
        console.log(bookmarkedShows);
      });

    this.http.get<any[]>(this.movieDataUrl).subscribe((data) => {
      const moviesWithBookmark = data.map((movie) => ({
        ...movie,
        isBookmarked: bookmarkedShows.includes(movie.title),
      }));

      console.log(moviesWithBookmark);

      this.store.dispatch(loadMoviesSuccess({ movies: moviesWithBookmark }));
    });
  }
}
