import { Component, Input } from '@angular/core';
import { MediaItem } from 'src/app/ngrx/types';

@Component({
  selector: 'media-card',
  templateUrl: './media-card.component.html',
})
export class MediaCardComponent {
  @Input() item!: MediaItem;
  @Input() isTv: boolean = false;
  imageLoaded = false;
}
