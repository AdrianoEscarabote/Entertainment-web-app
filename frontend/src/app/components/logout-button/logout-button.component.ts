import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import axios from 'axios';
import { resetMovies } from 'src/app/ngrx/movie.actions';

@Component({
  selector: 'logout-button-component',
  templateUrl: './logout-button.component.html',
})
export class LogoutButtonComponent {
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
    axios
      .get('https://real-erin-cow-boot.cyclic.app/auth/logout', {
        withCredentials: true,
      })
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
