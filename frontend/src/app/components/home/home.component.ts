import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { MovieState, MovieTypes } from 'src/app/ngrx/movie.reducer';
import { selectMovies, selectSearchTerm } from 'src/app/ngrx/movie.selectors';
import { SearchTermService } from 'src/app/service/search-term.service';
import { Store } from '@ngrx/store';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'home-component',
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit {
  searchTerm: string = '';
  shows: MovieTypes[] = [];
  filteredShows: MovieTypes[] = [];

  constructor(
    private router: Router,
    private store: Store<MovieState>,
    private searchTermService: SearchTermService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.movieService.getMovies();
    this.store.select(selectSearchTerm).subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
      this.filterShows();
    });

    // Retrieve the initial value of the service's searchTerm
    this.searchTermService.getSearchTerm().subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
      this.filterShows();
    });

    this.store.select(selectMovies).subscribe((shows) => {
      this.shows = shows;
      this.filterShows();
    });

    this.store.select(selectMovies).subscribe((shows) => {
      this.shows = shows;
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

  filterShows(): void {
    this.filteredShows = this.shows.filter((movie) =>
      movie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
