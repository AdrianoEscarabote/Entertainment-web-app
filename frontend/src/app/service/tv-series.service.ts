import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { loadAllTvSeriesSuccess } from '../ngrx/tv-series/tv-series.actions';
import { TvSeriesResponse } from './service.interfaces';
import { MediaItem } from '../ngrx/types';

@Injectable({
  providedIn: 'root',
})
export class TvSeriesService {
  private tvSeriesDataUrl = `${environment.apiUrl}/tv-series`;

  constructor(private http: HttpClient, private store: Store) {}

  async getAllMedia(): Promise<void> {
    const tvTypes = [
      'popular',
      'trending',
      'on-the-air',
      'top-rated',
      'airing-today',
    ];

    const tvSeriesRequest$ = this.http.post<TvSeriesResponse>(
      this.tvSeriesDataUrl,
      { types: tvTypes, page: 1 },
      { withCredentials: true }
    );

    tvSeriesRequest$.subscribe((response) => {
      this.store.dispatch(loadAllTvSeriesSuccess({ data: response as any }));
    });
  }

  getTvByType(types: string[], page: number) {
    return this.http.post<{
      tvSeries: MediaItem[];
      page: number;
      total_pages: number;
    }>(`${this.tvSeriesDataUrl}`, { types, page }, { withCredentials: true });
  }

  getTvByGenre(genre: string, page: number) {
    return this.http.post(
      `${this.tvSeriesDataUrl}/by-genre`,
      {
        genre: [genre],
        page: page,
      },
      { withCredentials: true }
    );
  }

  getTvDetails(id: string) {
    return this.http.post(
      this.tvSeriesDataUrl,
      { tv_series_id: id, types: ['tv-series-details'] },
      { withCredentials: true }
    );
  }

  getGenreList() {
    return this.http.get(`${this.tvSeriesDataUrl}/genre-list`, {
      withCredentials: true,
    });
  }
}
