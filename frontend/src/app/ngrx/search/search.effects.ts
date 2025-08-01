import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadSearchResults, loadSearchResultsSuccess } from './search.actions';
import { switchMap, map } from 'rxjs/operators';
import { TmdbService } from 'src/app/service/tmdb.service';

@Injectable()
export class SearchEffects {
  constructor(private actions$: Actions, private tmdbService: TmdbService) {}

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSearchResults),
      switchMap(({ searchTerm, mediaType, page }) => {
        const params: any = {
          searchTerm,
          type: mediaType,
          page,
        };

        return this.tmdbService.searchMulti(params).pipe(
          map((response) =>
            loadSearchResultsSuccess({
              results: {
                page: response.page,
                results: response.results,
                totalPages: response.total_pages,
              },
            })
          )
        );
      })
    )
  );
}
