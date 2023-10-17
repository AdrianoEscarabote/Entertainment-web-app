import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import axios from 'axios';
import { setBookmarkedShow } from 'src/app/ngrx/movie.actions';

@Component({
  selector: 'bookmarkbutton-component',
  templateUrl: './bookmarkButton.component.html',
})
export class BookmarkButtonComponent {
  @Input() showBookmarkedImg: boolean = false;
  @Input() showTitle: string = '';

  constructor(private store: Store) {}

  async bookmarkFn() {
    const response = await axios
      .post(
        'https://real-erin-cow-boot.cyclic.app/bookmark/set',
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
