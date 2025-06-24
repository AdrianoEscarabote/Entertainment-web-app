import { Component, Input } from '@angular/core';

@Component({
  selector: 'see-more-button',
  templateUrl: './see-more-button.component.html',
})
export class SeeMoreButtonComponent {
  @Input() href: string;
  @Input() loading: boolean;
  @Input() ariaLabel: string;

  constructor() {
    this.loading = false;
    this.href = '';
    this.ariaLabel = 'See more';
  }
}
