import { Component, EventEmitter, Input, Output } from '@angular/core';
import { setSearchTerm } from 'src/app/ngrx/movie.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'input-component',
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input() placeholderText: string;
  @Input() searchTerm: string = '';
  @Output() searchTermChange = new EventEmitter<string>();

  constructor(private store: Store) {
    this.placeholderText = '';
  }

  onInputChange() {
    // Trigger the action to update the search term in the NgRx state
    this.store.dispatch(setSearchTerm({ searchTerm: this.searchTerm }));
  }
}
