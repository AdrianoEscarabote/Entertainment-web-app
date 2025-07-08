import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import axios from 'axios';
import { setBookmarkedShow } from 'src/app/ngrx/movie/movie.actions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'bookmark-button-component',
  templateUrl: './bookmark-button.component.html',
})
export class BookmarkButtonComponent {
  @Input() showBookmarkedImg: boolean = false;
  @Input() showTitle: string = '';

  constructor(private store: Store) {}

  async bookmarkFn() {
    const response = await axios
      .post(
        `${environment.apiUrl}/bookmark/set`,
        {
          title: this.showTitle,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => res.data);

    this.showBookmarkedImg = response;

    this.store.dispatch(
      setBookmarkedShow({ title: this.showTitle, isBookmarked: response })
    );
  }
}
