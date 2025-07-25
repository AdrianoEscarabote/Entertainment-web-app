import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { loadMoviesByGenreSuccess } from 'src/app/ngrx/movie/movie.actions';
import { selectMoviesByGenre } from 'src/app/ngrx/movie/movie.selectors';
import { loadSearchResults } from 'src/app/ngrx/search/search.actions';
import {
  selectSearchPage,
  selectSearchResults,
  selectSearchTerm,
  selectSearchTotalPages,
} from 'src/app/ngrx/search/search.selectors';
import { loadTvSeriesByGenreSuccess } from 'src/app/ngrx/tv-series/tv-series.actions';
import { selectTvSeriesByGenre } from 'src/app/ngrx/tv-series/tv-series.selectors';
import { MovieService } from 'src/app/service/movie.service';
import { TvSeriesService } from 'src/app/service/tv-series.service';

@Component({
  selector: 'media-genre-page',
  templateUrl: './media-genre.page.html',
})
export class MediaGenrePage implements OnInit {
  genre!: string;
  page!: number;
  genreId!: string;
  movies$ = this.store.select(selectMoviesByGenre);
  series$ = this.store.select(selectTvSeriesByGenre);
  isTvSeries = this.router.url.startsWith('/tv-series');
  showItemsByGenre = true;
  searchTerm$ = this.store.select(selectSearchTerm);
  searchResults$ = this.store.select(selectSearchResults);

  onSearch(term: string) {
    this.showItemsByGenre = false;
  }

  onClearSearch() {
    this.showItemsByGenre = true;
  }

  searchPage$ = this.store.select(selectSearchPage);
  searchTotalPages$ = this.store.select(selectSearchTotalPages);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private tvSeriesService: TvSeriesService,
    private TitleService: Title,
    private store: Store
  ) {}

  get mediaList$() {
    return this.isTvSeries
      ? this.series$.pipe(
          map((res) => ({
            items: res.tvSeries,
            genre: res.genre,
            currentPage: res.currentPage,
            totalPages: res.totalPages,
          }))
        )
      : this.movies$.pipe(
          map((res) => ({
            items: res.movies,
            genre: res.genre,
            currentPage: res.currentPage,
            totalPages: res.totalPages,
          }))
        );
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.TitleService.setTitle(
        `${params.get('genre-name')} | ${
          this.isTvSeries ? 'TV Series' : 'Movies'
        }`
      );
      this.genre = params.get('genre-name')!;
      this.genreId = params.get('genre-id')!;
      this.page = Number(params.get('page')) || 1;

      const request$ = this.isTvSeries
        ? this.tvSeriesService.getTvByGenre(this.genreId, this.page)
        : this.movieService.getMoviesWithGenre(this.genreId, this.page);

      request$.subscribe((data: any) => {
        if (this.isTvSeries) {
          this.store.dispatch(
            loadTvSeriesByGenreSuccess({
              genre: this.genre,
              currentPage: this.page,
              totalPages: data.total_pages,
              tvSeries: data.tvSeries,
            })
          );
        } else {
          this.store.dispatch(
            loadMoviesByGenreSuccess({
              genre: this.genre,
              currentPage: this.page,
              totalPages: data.total_pages,
              movies: data.movies,
            })
          );
        }
      });
    });
  }

  onSearchPageChange(page: number) {
    this.searchTerm$.pipe(take(1)).subscribe((searchTerm) => {
      this.store.dispatch(
        loadSearchResults({
          searchTerm,
          mediaType: this.isTvSeries ? 'tv' : 'movie',
          page,
        })
      );
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goToPage(targetPage: number) {
    const mediaType = this.isTvSeries ? 'tv-series' : 'movies';

    this.router.navigate([
      `/${mediaType}/genre/${this.genre}/${this.genreId}/${targetPage}`,
    ]);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
