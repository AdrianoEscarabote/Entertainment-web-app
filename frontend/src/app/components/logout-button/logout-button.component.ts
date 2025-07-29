import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import axios from 'axios';
import { resetMovies } from 'src/app/ngrx/movie/movie.actions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'logout-button-component',
  templateUrl: './logout-button.component.html',
})
export class LogoutButtonComponent {
  loading: boolean = false;
  logoutOptionOpen: boolean = false;

  constructor(private router: Router, private store: Store) {}

  handleClickOpenOptions() {
    if (this.logoutOptionOpen) {
      this.logoutOptionOpen = false;
    } else {
      this.logoutOptionOpen = true;
    }
  }

  logoutFn() {
    this.loading = true;
    axios
      .post(
        `${environment.apiUrl}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          this.store.dispatch(resetMovies());
          this.router.navigate(['/login']);
        }
      })
      .catch((error) => {
        return;
      });
  }
}
