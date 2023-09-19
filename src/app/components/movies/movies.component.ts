import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'movies-component',
  templateUrl: './movies.component.html',
})
export class MoviesComponent {
  constructor(private router: Router) {}
}
