import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { MovieState, MovieTypes } from 'src/app/ngrx/movie.reducer';
import { selectMovies } from 'src/app/ngrx/movie.selectors';

@Component({
  selector: 'series-component',
  templateUrl: './series.component.html',
})
export class SeriesComponent implements OnInit {
  movies: MovieTypes[] = [];

  constructor(private store: Store<MovieState>) {}

  ngOnInit(): void {
    this.store.select(selectMovies).subscribe((movies) => {
      this.movies = movies;
    });
  }

  movies$ = this.store.select(selectMovies).pipe(
    map((movies) =>
      movies
        .filter((movie) => movie.category === 'TV Series')
        .map((movie) => ({
          /* 
        thumbnailLarge: movie.thumbnail.trending.large,
        thumbnailSmall: movie.thumbnail.trending.small, */
          thumbnailLarge: movie.thumbnail.regular.large,
          movieData: {
            title: movie.title,
            year: movie.year.toString(),
            type: movie.category,
            rating: movie.rating,
          },
        }))
    )
  );
}
