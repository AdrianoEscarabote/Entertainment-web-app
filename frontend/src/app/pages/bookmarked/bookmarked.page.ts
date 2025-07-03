import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBookmarks } from 'src/app/ngrx/bookmark/bookmark.selectors';
import { MovieService } from 'src/app/service/movie.service';
import { TvSeriesService } from 'src/app/service/tv-series.service';
import { forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MediaItem } from 'src/app/ngrx/types';
import { BookmarkService } from 'src/app/service/bookmark.service';

@Component({
  selector: 'bookmarked-page',
  templateUrl: './bookmarked.page.html',
})
export class BookmarkedPage implements OnInit {
  movieItems: MediaItem[] = [];
  seriesItems: MediaItem[] = [];

  constructor(
    private store: Store,
    private movieService: MovieService,
    private tvService: TvSeriesService,
    private bookmarkService: BookmarkService
  ) {}

  ngOnInit() {
    this.bookmarkService.getBookmarkedShows().then(() => {
      this.store
        .select(selectBookmarks)
        .pipe(
          switchMap(({ movies, tvSeries }) => {
            const movieRequests = movies.map((id) =>
              this.movieService.getMovieDetails(id.toString())
            );
            const seriesRequests = tvSeries.map((id) =>
              this.tvService.getTvDetails(id.toString())
            );

            return forkJoin({
              movies: movieRequests.length ? forkJoin(movieRequests) : of([]),
              tvSeries: seriesRequests.length
                ? forkJoin(seriesRequests)
                : of([]),
            });
          })
        )
        .subscribe(({ movies, tvSeries }) => {
          this.movieItems = movies as MediaItem[];
          this.seriesItems = tvSeries as MediaItem[];
        });
    });
  }
}
