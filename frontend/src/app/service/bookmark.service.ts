import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoadBookmarks } from '../ngrx/bookmark/bookmark.actions';

export interface GetBookmarkResponse {
  movies: string[];
  tvSeries: string[];
}

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  private bookmarkUrl = `${environment.apiUrl}/bookmark`;
  constructor(private http: HttpClient, private store: Store) {}

  async getBookmarkedShows(): Promise<void> {
    const request$ = this.http.get<GetBookmarkResponse>(
      `${this.bookmarkUrl}/get`,
      {
        withCredentials: true,
      }
    );

    request$.subscribe(
      (response) => {
        this.store.dispatch(
          LoadBookmarks({
            movies: response.movies,
            tvSeries: response.tvSeries,
          })
        );
      },
      (error: any) => {
        console.error('Error fetching bookmarked shows:', error);
      }
    );
  }

  toggleBookmark(
    mediaType: 'movies' | 'tv-series',
    show_id: string
  ): Observable<any> {
    return this.http.post(
      `${this.bookmarkUrl}/set`,
      { show_type: mediaType, show_id },
      { withCredentials: true }
    );
  }
}
