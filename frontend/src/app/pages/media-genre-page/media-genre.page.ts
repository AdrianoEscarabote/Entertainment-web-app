import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { loadMoviesByGenreSuccess } from 'src/app/ngrx/movie/movie.actions';
import { selectMoviesByGenre } from 'src/app/ngrx/movie/movie.selectors';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private tvSeriesService: TvSeriesService,
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
    this.genre = this.route.snapshot.paramMap.get('genre-name')!;
    this.genreId = this.route.snapshot.paramMap.get('genre-id')!;
    this.page = Number(this.route.snapshot.paramMap.get('page')) || 1;

    const request$ = this.isTvSeries
      ? this.tvSeriesService.getTvByGenre(this.genreId, this.page)
      : this.movieService.getMoviesWithGenre(this.genreId, this.page);

    request$.subscribe((data: any) => {
      if (this.isTvSeries) {
        this.store.dispatch(
          loadTvSeriesByGenreSuccess({
            genre: this.genre,
            currentPage: this.page,
            totalPages: data.totalPages,
            tvSeries: data.tvSeries,
          })
        );
        return;
      }
      this.store.dispatch(
        loadMoviesByGenreSuccess({
          genre: this.genre,
          currentPage: this.page,
          totalPages: data.totalPages,
          movies: data.movies,
        })
      );
    });
  }
}
