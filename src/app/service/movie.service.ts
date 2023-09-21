import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { loadMoviesSuccess } from '../ngrx/movie.actions';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private movieDataUrl = '../../assets/data.json'; // Substitua pelo caminho correto
  constructor(private http: HttpClient, private store: Store) {}

  getMovies(): void {
    this.http.get<any[]>(this.movieDataUrl).subscribe((data) => {
      this.store.dispatch(loadMoviesSuccess({ movies: data }));
    });
  }
}
