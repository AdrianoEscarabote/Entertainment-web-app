import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { MovieState, MovieTypes } from 'src/app/ngrx/movie.reducer';
import { selectMovies } from 'src/app/ngrx/movie.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'bookmarked-component',
  templateUrl: './bookmarked.component.html',
})
export class BookmarkedComponent implements OnInit {
  movies: MovieTypes[] = [];
  series: MovieTypes[] = [];

  constructor(private router: Router, private store: Store<MovieState>) {}

  async ngOnInit(): Promise<void> {
    this.store.select(selectMovies).subscribe((shows) => {
      this.movies = shows.filter(
        (movie) => movie.isBookmarked && movie.category === 'Movie'
      );
      this.series = shows.filter(
        (serie) => serie.isBookmarked && serie.category === 'TV Series'
      );
    });

    axios
      .get('https://real-erin-cow-boot.cyclic.app/auth/checktoken', {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          return;
        }
      })
      .catch((error) => {
        this.router.navigate(['/login']);
      });
  }
}
