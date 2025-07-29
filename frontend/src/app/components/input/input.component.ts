import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  @Output() searchPageChange = new EventEmitter<number>();

  error: string = '';

  constructor(private store: Store, private router: Router) {}

  get mediaType(): 'movie' | 'tv' | 'multi' {
    if (this.router.url.startsWith('/movies')) {
      return 'movie';
    }
    if (this.router.url.startsWith('/tv-series')) {
      return 'tv';
    }
    return 'multi';
  }

  onInputChange() {
    this.error = '';
    this.searchTermChange.emit(this.searchTerm);
    this.store.dispatch(setSearchTerm({ searchTerm: this.searchTerm }));
  }

  goToPage(page: number) {
    this.searchPageChange.emit(page);
    this.store.dispatch(
      loadSearchResults({
        searchTerm: this.searchTerm,
        mediaType: this.mediaType,
        page,
      })
    );
  }

  onSearch() {
    if (this.searchTerm.trim() === '') {
      this.error = 'Please enter a term to search.';
      return;
    }
    this.search.emit(this.searchTerm);

    this.store.dispatch(
      loadSearchResults({
        searchTerm: this.searchTerm,
        mediaType: this.mediaType,
      })
    );
  }
}
