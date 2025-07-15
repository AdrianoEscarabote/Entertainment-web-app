import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable, first, map } from 'rxjs';

import { MovieService } from 'src/app/service/movie.service';
import { TvSeriesService } from 'src/app/service/tv-series.service';
import { BookmarkService } from 'src/app/service/bookmark.service';

import { loadMovieDetails } from 'src/app/ngrx/movie/movie.actions';
import { selectMovieDetails } from 'src/app/ngrx/movie/movie.selectors';

import {
  addBookmark,
  removeBookmark,
} from 'src/app/ngrx/bookmark/bookmark.actions';
import { selectBookmarks } from 'src/app/ngrx/bookmark/bookmark.selectors';

import { MediaItem } from 'src/app/ngrx/types';
import { loadTvSeriesDetails } from 'src/app/ngrx/tv-series/tv-series.actions';
import { selectTvSeriesDetails } from 'src/app/ngrx/tv-series/tv-series.selectors';

@Component({
  selector: 'media-details-page',
  templateUrl: './media-details.page.html',
})
export class MediaDetailsPage implements OnInit {
  mediaType!: 'movie' | 'tv';
  id!: string;

  media$!: Observable<MediaItem | null>;
  isBookmarked$!: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private store: Store,
    private movieService: MovieService,
    private tvSeriesService: TvSeriesService,
    private bookmarkService: BookmarkService
  ) {}

  ngOnInit(): void {
    this.mediaType = this.route.snapshot.paramMap.get('type') as 'movie' | 'tv';
    this.id = this.route.snapshot.paramMap.get('id')!;

    if (this.mediaType === 'movie') {
      this.media$ = this.store.select(selectMovieDetails);

      this.movieService
        .getMovieDetails(this.id)
        .subscribe((movieDetails: any) => {
          this.store.dispatch(loadMovieDetails({ movieDetails }));
          if (movieDetails?.title) {
            this.titleService.setTitle(
              `${movieDetails.title} | Entertainment web App`
            );
          }
        });
    } else {
      this.media$ = this.store.select(selectTvSeriesDetails);
      this.tvSeriesService
        .getTvDetails(this.id)
        .subscribe((tvSeriesDetails: any) => {
          this.store.dispatch(
            loadTvSeriesDetails({ tvSeriesDetails: tvSeriesDetails })
          );
          this.titleService.setTitle(
            `${tvSeriesDetails.name} | Entertainment web App`
          );
        });
    }

    const bookmarkKey = this.mediaType === 'movie' ? 'movies' : 'tvSeries';
    this.isBookmarked$ = this.store
      .select(selectBookmarks)
      .pipe(map((bookmarks) => bookmarks[bookmarkKey].includes(this.id)));
  }

  toggleBookmark(): void {
    const ngrxType = this.mediaType === 'movie' ? 'movies' : 'tv-series';

    this.isBookmarked$.pipe(first()).subscribe((isBookmarked) => {
      if (isBookmarked) {
        this.store.dispatch(
          removeBookmark({ id: this.id, mediaType: ngrxType })
        );
      } else {
        this.bookmarkService.toggleBookmark(ngrxType, this.id).subscribe(
          () => {
            this.store.dispatch(
              addBookmark({ id: this.id, mediaType: ngrxType })
            );
          },
          (error) => {
            console.error('Error toggling bookmark:', error);
          }
        );
      }
    });
  }
}
