import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  combineLatestWith,
  filter,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import { loadAllMovieCategoriesSuccess } from 'src/app/ngrx/movie/movie.actions';
import { clearSearchResults } from 'src/app/ngrx/search/search.actions';
import {
  selectSearchResults,
  selectSearchTerm,
} from 'src/app/ngrx/search/search.selectors';
import { loadAllTvSeriesSuccess } from 'src/app/ngrx/tv-series/tv-series.actions';
import { MediaItem } from 'src/app/ngrx/types';
import { MovieService } from 'src/app/service/movie.service';
import { TvSeriesService } from 'src/app/service/tv-series.service';

@Component({
  selector: 'media-category-list',
  templateUrl: './media-category-list.component.html',
})
export class MediaCategoryListComponent implements OnInit {
  @Input() media$!: Observable<MediaItem | null>;
  mediaType: 'movies' | 'tv-series' = 'movies';
  formattedCategory: string = '';
  category: string = '';
  page: number = 1;
  totalPages = 1;
  items$!: Observable<MediaItem[]>;
  isTvSeries = this.router.url.startsWith('/tv-series');

  private categoryMap: Record<string, string> = {
    popular: 'popular',
    trending: 'trending',
    'now-playing': 'nowPlaying',
    upcoming: 'upcoming',
    'top-rated': 'topRated',
    'on-the-air': 'onTheAir',
    'airing-today': 'airingToday',
  };

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
    private movieService: MovieService,
    private tvSeriesService: TvSeriesService,
    private TitleService: Title
  ) {}

  searchTerm$ = this.store.select(selectSearchTerm);
  searchResults$ = this.store.select(selectSearchResults);

  categoryItems$!: Observable<MediaItem[]>;

  ngOnInit(): void {
    this.store.dispatch(clearSearchResults());
    this.categoryItems$ = combineLatest([
      this.route.url,
      this.route.paramMap,
    ]).pipe(
      filter(([url]) => url.length > 0),
      switchMap(([url, params]) => {
        this.mediaType = url[0].path as 'movies' | 'tv-series';
        this.category = params.get('category') as string;
        this.page = Number(params.get('page')) || 1;

        const camelCategory = this.categoryMap[this.category] || this.category;
        this.formattedCategory = this.capitalizeWords(this.category);
        this.isTvSeries = this.mediaType === 'tv-series';

        this.TitleService.setTitle(
          `${this.formattedCategory} | ${
            this.isTvSeries ? 'TV Series' : 'Movies'
          }`
        );

        if (this.mediaType === 'movies') {
          return this.movieService
            .getMoviesByType([this.category], this.page)
            .pipe(
              map((response: any) => {
                const categoryData = response[camelCategory];
                this.totalPages = categoryData.total_pages;

                this.store.dispatch(
                  loadAllMovieCategoriesSuccess({
                    data: {
                      [camelCategory]: {
                        movies: categoryData.movies,
                        page: categoryData.page,
                        total_pages: categoryData.total_pages,
                      },
                    },
                  })
                );

                return categoryData.movies;
              })
            );
        } else {
          return this.tvSeriesService
            .getTvByType([this.category], this.page)
            .pipe(
              map((response: any) => {
                const categoryData = response[camelCategory];
                this.totalPages = categoryData.total_pages;

                this.store.dispatch(
                  loadAllTvSeriesSuccess({
                    data: {
                      [camelCategory]: {
                        tvSeries: categoryData.tvSeries,
                        page: categoryData.page,
                        total_pages: categoryData.total_pages,
                      },
                    },
                  })
                );

                return categoryData.tvSeries;
              })
            );
        }
      })
    );

    this.items$ = this.searchResults$.pipe(
      combineLatestWith(this.searchTerm$, this.categoryItems$),
      map(([results, term, categoryItems]) => {
        if (term.trim().length > 0 && results.length > 0) {
          return results;
        }
        if (term.trim().length === 0 && results.length > 0) {
          this.store.dispatch(clearSearchResults());
        }
        return categoryItems;
      })
    );
  }

  capitalizeWords(text: string): string {
    return text
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  goToPage(targetPage: number) {
    const mediaType = this.mediaType;
    const category = this.category;

    this.router.navigate([`/${mediaType}/${category}/${targetPage}`]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
