import { Component, Input } from '@angular/core';

@Component({
  selector: 'button-component',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() buttonText: string;
  @Input() buttonType: string;
  @Input() loading: boolean;

  constructor() {
    this.loading = false;
    this.buttonText = '';
    this.buttonType = '';
  }
}
