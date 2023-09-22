import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from './service/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies();
  }

  // Checks whether the current route should use the authentication layout
  isAuthLayoutRoute(): boolean {
    const currentRoute = this.router.url;
    return currentRoute.includes('login') || currentRoute.includes('signup');
  }
}
