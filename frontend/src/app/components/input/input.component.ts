import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  setSearchTerm,
  loadSearchResults,
} from 'src/app/ngrx/search/search.actions';

@Component({
  selector: 'input-component',
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input() placeholderText: string = '';
  @Input() searchTerm: string = '';
  @Output() searchTermChange = new EventEmitter<string>();
  @Output() search = new EventEmitter<string>();

  error: string = '';

  constructor(private store: Store) {}

  onInputChange() {
    this.error = '';
    this.searchTermChange.emit(this.searchTerm);
    this.store.dispatch(setSearchTerm({ searchTerm: this.searchTerm }));
  }

  onSearch() {
    if (this.searchTerm.trim() === '') {
      this.error = 'Please enter a term to search.';
      return;
    }
    this.search.emit(this.searchTerm);
    this.store.dispatch(loadSearchResults({ searchTerm: this.searchTerm }));
  }
}
