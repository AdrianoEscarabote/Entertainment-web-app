import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NameState } from './ngrx/app-state';
import { selectName } from './ngrx/name.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  name: string = 'teste';

  constructor(private store: Store<NameState>, private router: Router) {}

  ngOnInit() {
    this.store.select(selectName).subscribe((name) => {
      this.name = name;
    });
  }

  // Verifica se a rota atual deve usar o layout de autenticação
  isAuthLayoutRoute(): boolean {
    const currentRoute = this.router.url;
    return currentRoute.includes('login') || currentRoute.includes('signup');
  }
}
