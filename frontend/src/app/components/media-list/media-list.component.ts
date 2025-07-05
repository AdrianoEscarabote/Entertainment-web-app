import { Component, Input } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MediaItem } from 'src/app/ngrx/types';

@Component({
  selector: 'media-list',
  templateUrl: './media-list.component.html',
})
export class MediaListComponent {
  private _items$!: Observable<MediaItem[]>;

  @Input() set items$(value: Observable<MediaItem[]>) {
    this._items$ = value;
    this.hasSpecificMediaType$ = this._items$.pipe(
      map((items) => items.some((item) => item.media_type === this.mediaType))
    );
  }
  get items$() {
    return this._items$;
  }

  @Input() title: string = 'Trending';
  @Input() mediaType: 'movie' | 'tv' = 'movie';
  @Input() linkTo: string = '/';

  hasSpecificMediaType$!: Observable<boolean>;
}
