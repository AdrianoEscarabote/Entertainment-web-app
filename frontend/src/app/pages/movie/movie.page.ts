import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadMovieDetailsSuccess } from 'src/app/ngrx/movie.actions';
import { selectMovieDetails } from 'src/app/ngrx/movie.selectors';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'movie-page',
  templateUrl: './movie.page.html',
})
export class MoviePage implements OnInit {
  movieId!: string;

  movies$ = this.store.select(selectMovieDetails);

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get('id')!;
    this.movieService
      .getMovieDetails(this.movieId)
      .subscribe((movieDetails: any) => {
        this.store.dispatch(loadMovieDetailsSuccess({ movieDetails }));
      });
  }
}
