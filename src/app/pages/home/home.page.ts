import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NameState } from 'src/app/ngrx/app-state';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
})
export class HomePage {
  name: string = 'teste';

  constructor(private store: Store<NameState>, private router: Router) {}

  changeValue() {
    this.name = '';
  }
}
