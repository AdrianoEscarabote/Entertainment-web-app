import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaItem } from 'src/app/ngrx/types';

@Component({
  selector: 'trending-component',
  templateUrl: './trending.component.html',
})
export class TrendingComponent {
  private _items$!: Observable<MediaItem[]>;

  @Input() set items$(value: Observable<MediaItem[]>) {
    this._items$ = value;
  }
  get items$() {
    return this._items$;
  }

  @Input() title: string = 'Trending';
  @Input() mediaType: 'movies' | 'tv-series' = 'movies';
  @Input() linkTo: string = '/';

  hasSpecificMediaType$!: Observable<boolean>;
}
