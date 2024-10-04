import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { MovieState, MovieTypes } from 'src/app/ngrx/movie.reducer';
import { selectMovies, selectSearchTerm } from 'src/app/ngrx/movie.selectors';
import { Store } from '@ngrx/store';
import { SearchTermService } from 'src/app/service/search-term.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'bookmarked-component',
  templateUrl: './bookmarked.component.html',
})
export class BookmarkedComponent implements OnInit {
  searchTerm: string = '';
  filteredShows: MovieTypes[] = [];
  movies: MovieTypes[] = [];
  series: MovieTypes[] = [];

  constructor(
    private router: Router,
    private store: Store<MovieState>,
    private searchTermService: SearchTermService
  ) {}

  async ngOnInit(): Promise<void> {
    this.store.select(selectSearchTerm).subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
      this.filterShows();
    });

    this.searchTermService.getSearchTerm().subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
      this.filterShows();
    });

    this.store.select(selectMovies).subscribe((movies) => {
      this.movies = movies;
      this.filterShows();
    });

    this.store.select(selectMovies).subscribe((shows) => {
      this.movies = shows.filter(
        (movie) => movie.isBookmarked && movie.category === 'Movie'
      );
      this.series = shows.filter(
        (serie) => serie.isBookmarked && serie.category === 'TV Series'
      );
    });

    axios
      .get(`${environment.apiUrl}/auth/checktoken`, {
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

  filterShows(): void {
    const filteredMovies = this.movies.filter(
      (movie) =>
        movie.isBookmarked &&
        movie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    const filteredSeries = this.series.filter(
      (serie) =>
        serie.isBookmarked &&
        serie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.filteredShows = [...filteredMovies, ...filteredSeries];
  }
}
