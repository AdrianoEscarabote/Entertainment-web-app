import { Injectable } from '@angular/core';
import { MediaItem } from '../ngrx/types';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

export interface TvSeriesResponse {
  popular?: MediaItem[];
  trending?: MediaItem[];
  onTheAir?: MediaItem[];
  topRated?: MediaItem[];
  airingToday?: MediaItem[];
  tvSeriesDetails?: MediaItem;
}

@Injectable({
  providedIn: 'root',
})
export class TvSeriesService {
  private tvSeriesDataUrl = `${environment.apiUrl}/tv-series`;

  constructor(private http: HttpClient, private store: Store) {}

  getTvByGenre(genre: string, page: number) {
    return this.http.post(
      `${environment.apiUrl}/tv-series/by-genre`,
      {
        genre: [genre],
        page: page,
      },
      { withCredentials: true }
    );
  }

  getTvDetails(id: string) {
    return this.http.post(
      `${environment.apiUrl}/tv-series`,
      { tv_series_id: id, types: ['tv-series-details'] },
      { withCredentials: true }
    );
  }

  getGenreList() {
    return this.http.get(`${environment.apiUrl}/tv-series/genre-list`, {
      withCredentials: true,
    });
  }
}
