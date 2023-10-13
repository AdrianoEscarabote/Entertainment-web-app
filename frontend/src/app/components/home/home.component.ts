import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'home-component',
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies();
    axios
      .get('https://real-erin-cow-boot.cyclic.app/auth/checktoken', {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          return;
        }
      })
      .catch((error) => {
        this.router.navigate(['/login']);
      });
  }
}
