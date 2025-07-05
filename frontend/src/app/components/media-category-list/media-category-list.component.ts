import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map, Observable, switchMap } from 'rxjs';
import { loadAllMovieCategoriesSuccess } from 'src/app/ngrx/movie/movie.actions';
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

  ngOnInit(): void {
    combineLatest([this.route.url, this.route.paramMap])
      .pipe(
        filter(([url]) => url.length > 0),
        switchMap(([url, params]) => {
          this.mediaType = url[0].path as 'movies' | 'tv-series';
          this.category = params.get('category') as string;
          this.page = Number(params.get('page')) || 1;

          const camelCategory =
            this.categoryMap[this.category] || this.category;

          if (this.mediaType === 'movies') {
            return this.movieService
              .getMoviesByType([this.category], this.page)
              .pipe(
                map((response: any) => {
                  const categoryData = response[camelCategory];
                  this.totalPages = categoryData.total_pages;
                  return {
                    type: 'movies' as const,
                    data: {
                      movies: categoryData.movies,
                      page: categoryData.page,
                      total_pages: categoryData.total_pages,
                    },
                    camelCategory,
                  };
                })
              );
          } else {
            return this.tvSeriesService
              .getTvByType([this.category], this.page)
              .pipe(
                map((response: any) => {
                  const categoryData = response[camelCategory];
                  this.totalPages = categoryData.total_pages;
                  return {
                    type: 'tv-series' as const,
                    data: {
                      tvSeries: categoryData.tvSeries,
                      page: categoryData.page,
                      total_pages: categoryData.total_pages,
                    },
                    camelCategory,
                  };
                })
              );
          }
        })
      )
      .subscribe(({ type, data, camelCategory }) => {
        if (type === 'movies' && data?.movies) {
          this.store.dispatch(
            loadAllMovieCategoriesSuccess({
              data: {
                [camelCategory]: {
                  movies: Array.isArray(data.movies) ? data.movies : [],
                  page: data.page,
                  total_pages: data.total_pages,
                },
              },
            })
          );

          this.items$ = this.store.select(
            (state: any) => state.movies[camelCategory]?.movies || []
          );
        } else if (type === 'tv-series' && data?.tvSeries) {
          this.store.dispatch(
            loadAllTvSeriesSuccess({
              data: {
                [camelCategory]: {
                  tvSeries: Array.isArray(data.tvSeries) ? data.tvSeries : [],
                  page: data.page,
                  total_pages: data.total_pages,
                },
              },
            })
          );

          this.items$ = this.store.select(
            (state: any) => state.tvSeries[camelCategory]?.tvSeries || []
          );
        }
      });
    this.formattedCategory = this.capitalizeWords(this.category);

    this.TitleService.setTitle(
      `${this.formattedCategory} | ${this.isTvSeries ? 'TV Series' : 'Movies'}`
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
