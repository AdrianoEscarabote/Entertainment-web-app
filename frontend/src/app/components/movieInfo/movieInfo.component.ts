import { Component, Input } from '@angular/core';

interface MovieType {
  title: string;
  year: string;
  category: string;
  rating: string;
}

@Component({
  selector: 'movieInfo-component',
  templateUrl: './movieInfo.component.html',
})
export class MovieInfoComponent {
  @Input() title: string = '';
  @Input() media_type: string = '';
  @Input() release_date: string = '';
  @Input() show_shadow: boolean = true;

  get year(): string {
    return this.release_date
      ? new Date(this.release_date).getFullYear().toString()
      : '';
  }
}
