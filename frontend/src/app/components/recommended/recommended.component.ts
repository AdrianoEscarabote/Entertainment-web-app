import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectMovies } from 'src/app/ngrx/movie.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'recommended-component',
  templateUrl: 'recommended.component.html',
})
export class RecommendedComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}

  movies$ = this.store.select(selectMovies).pipe(
    map((movies) =>
      movies
        .filter((movie) => movie.isTrending !== true)
        .map((movie) => ({
          thumbnailLarge: movie.thumbnail.regular.large,
          isBookmarked: movie.isBookmarked,
          movieData: {
            title: movie.title,
            year: movie.year.toString(),
            category: movie.category,
            rating: movie.rating,
          },
        }))
    )
  );
}
