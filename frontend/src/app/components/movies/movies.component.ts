import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import axios from 'axios';
import { loadMoviesGenresList } from 'src/app/ngrx/movie/movie.actions';
import { selectMoviesGenresList } from 'src/app/ngrx/movie/movie.selectors';
import {
  selectSearchResults,
  selectSearchTerm,
} from 'src/app/ngrx/search/search.selectors';
import { AppState } from 'src/app/ngrx/types';
import { MovieService } from 'src/app/service/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'movies-component',
  templateUrl: './movies.component.html',
})
export class MoviesComponent implements OnInit {
  basePath: string = 'movies';
  genres = this.store.select(selectMoviesGenresList);
  showGenresList = true;

  searchTerm$ = this.store.select(selectSearchTerm);
  searchResults$ = this.store.select(selectSearchResults);

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private titleService: Title,
    private movieService: MovieService
  ) {}

  onSearch(term: string) {
    this.showGenresList = false;
  }

  onClearSearch() {
    this.showGenresList = true;
  }

  ngOnInit(): void {
    this.titleService.setTitle(`Movies Genres | Entertainment web App`);
    this.movieService.getMoviesGenreList().subscribe((genresList: any) => {
      this.store.dispatch(loadMoviesGenresList({ genresList }));
    });

    axios
      .get(`${environment.apiUrl}/auth/checktoken`, {
        withCredentials: true,
      })
      .catch(() => this.router.navigate(['/login']));
  }
}
