import { Component, Input } from '@angular/core';

@Component({
  selector: 'button-component', // Seletor do ButtonComponent
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() buttonText: string;
  @Input() buttonType: string;

  constructor() {
    this.buttonText = '';
    this.buttonType = '';
  }
}
