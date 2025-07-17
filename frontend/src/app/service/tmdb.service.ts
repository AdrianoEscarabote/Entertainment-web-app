import { Injectable } from '@angular/core';
import axios from 'axios';
import { from, Observable } from 'rxjs';
import { MediaItem } from '../ngrx/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  searchMulti(params: {
    searchTerm: string;
    type: string;
  }): Observable<{ results: MediaItem[]; page: number; total_pages: number }> {
    const { searchTerm, type } = params;

    const requestBody: any = { query: searchTerm };
    if (type) requestBody.type = type;

    return from(
      axios
        .post<{ results: MediaItem[]; page: number; total_pages: number }>(
          `${environment.apiUrl}/search`,
          requestBody,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        )
        .then((res) => res.data)
    );
  }
}
