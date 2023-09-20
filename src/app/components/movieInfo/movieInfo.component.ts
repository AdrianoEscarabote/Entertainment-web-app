import { Component, Input } from '@angular/core';

interface MovieType {
  title: string;
  year: string;
  type: string;
  rating: string;
}

@Component({
  selector: 'movieInfo-component',
  templateUrl: './movieInfo.component.html',
})
export class MovieInfoComponent {
  @Input() movieData: MovieType;

  constructor() {
    this.movieData = {
      title: '',
      year: '',
      type: '',
      rating: '',
    };
  }
}
