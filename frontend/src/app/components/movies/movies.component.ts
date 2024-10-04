import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import axios from 'axios';
import { MovieState, MovieTypes } from 'src/app/ngrx/movie.reducer';
import { selectMovies, selectSearchTerm } from 'src/app/ngrx/movie.selectors';
import { SearchTermService } from 'src/app/service/search-term.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'movies-component',
  templateUrl: './movies.component.html',
})
export class MoviesComponent implements OnInit {
  searchTerm: string = '';
  movies: MovieTypes[] = [];
  filteredMovies: MovieTypes[] = [];

  constructor(
    private store: Store<MovieState>,
    private router: Router,
    private searchTermService: SearchTermService
  ) {}

  ngOnInit(): void {
    this.store.select(selectSearchTerm).subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
      this.filterMovies();
    });

    // Retrieve the initial value of the service's searchTerm
    this.searchTermService.getSearchTerm().subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
      this.filterMovies();
    });

    this.store.select(selectMovies).subscribe((movies) => {
      this.movies = movies;
      this.filterMovies();
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

  filterMovies(): void {
    this.filteredMovies = this.movies.filter(
      (movie) =>
        movie.category === 'Movie' &&
        movie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
