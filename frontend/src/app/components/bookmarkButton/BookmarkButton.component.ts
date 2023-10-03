import { Component, Input } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'bookmarkbutton-component',
  templateUrl: './bookmarkButton.component.html',
})
export class BookmarkButtonComponent {
  @Input() showBookmarkedImg: boolean = false;
  @Input() showTitle: string = '';

  async bookmarkFn() {
    const response = await axios
      .post('https://real-erin-cow-boot.cyclic.app/bookmark/set', {
        title: this.showTitle,
      })
      .then((res) => res.data);
    this.showBookmarkedImg = response.ok;
  }
}
