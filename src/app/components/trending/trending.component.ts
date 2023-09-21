import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectMovies } from 'src/app/ngrx/movie.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'trending-component',
  templateUrl: './trending.component.html',
})
export class TrendingComponent implements OnInit {
  movies$ = this.store.select(selectMovies).pipe(
    map((movies) =>
      movies
        .filter((movie) => movie.isTrending === true)
        .map((movie) => ({
          title: movie.title,
          year: movie.year,
          category: movie.category,
          rating: movie.rating,
          isBookmarked: movie.isBookmarked,
          isTrending: movie.isTrending,
          thumbnailLarge: movie.thumbnail.trending.large,
          thumbnailSmall: movie.thumbnail.trending.small,
        }))
    )
  );

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
