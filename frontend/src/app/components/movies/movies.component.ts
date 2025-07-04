import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import axios from 'axios';
import { loadMoviesGenresList } from 'src/app/ngrx/movie/movie.actions';
import { selectMoviesGenresList } from 'src/app/ngrx/movie/movie.selectors';
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

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(`Movies Genres | Entertainment web App`);
    this.basePath = this.route.snapshot.url[0]?.path || 'movies';
    this.movieService.getMoviesGenreList().subscribe((genresList: any) => {
      this.store.dispatch(loadMoviesGenresList({ genresList }));
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
}
