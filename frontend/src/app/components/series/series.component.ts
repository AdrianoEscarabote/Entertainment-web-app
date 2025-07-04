import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import axios from 'axios';
import { loadTvSeriesGenresList } from 'src/app/ngrx/tv-series/tv-series.actions';
import { selectTvSeriesGenresList } from 'src/app/ngrx/tv-series/tv-series.selectors';
import { AppState } from 'src/app/ngrx/types';
import { TvSeriesService } from 'src/app/service/tv-series.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'series-component',
  templateUrl: './series.component.html',
})
export class SeriesComponent implements OnInit {
  genres = this.store.select(selectTvSeriesGenresList);

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private titleService: Title,
    private tvSeriesService: TvSeriesService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(`Series Genres | Entertainment web App`);
    this.tvSeriesService.getGenreList().subscribe((genresList: any) => {
      this.store.dispatch(loadTvSeriesGenresList({ genresList }));
    });

    axios
      .get(`${environment.apiUrl}/auth/checktoken`, {
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
