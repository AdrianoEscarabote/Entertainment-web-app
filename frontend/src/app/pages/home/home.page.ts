import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import axios from 'axios';
import {
  selectTrendingMovies,
  selectPopularMovies,
  selectUpcomingMovies,
  selectNowPlayingMovies,
  selectTopRatedMovies,
} from 'src/app/ngrx/movie/movie.selectors';
import { clearSearchResults } from 'src/app/ngrx/search/search.actions';
import {
  selectSearchResults,
  selectSearchTerm,
} from 'src/app/ngrx/search/search.selectors';
import {
  selectTrendingTvSeries,
  selectPopularTvSeries,
  selectOnTheAirTvSeries,
  selectTopRatedTvSeries,
  selectAiringTodayTvSeries,
} from 'src/app/ngrx/tv-series/tv-series.selectors';
import { MediaItem, AppState } from 'src/app/ngrx/types';
import { MovieService } from 'src/app/service/movie.service';
import { SearchTermService } from 'src/app/service/search-term.service';
import { TvSeriesService } from 'src/app/service/tv-series.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
})
export class HomePage implements OnInit {
  searchTerm: string = '';
  shows: MediaItem[] = [];
  filteredShows: MediaItem[] = [];

  searchTerm$ = this.store.select(selectSearchTerm);
  filteredShows$ = this.store.select(selectSearchResults);

  trendingMovies$ = this.store.select(selectTrendingMovies);
  popularMovies$ = this.store.select(selectPopularMovies);
  upcomingMovies$ = this.store.select(selectUpcomingMovies);
  nowPlayingMovies$ = this.store.select(selectNowPlayingMovies);
  topRatedMovies$ = this.store.select(selectTopRatedMovies);

  trendingTvSeries$ = this.store.select(selectTrendingTvSeries);
  popularTvSeries$ = this.store.select(selectPopularTvSeries);
  onTheAirTvSeries$ = this.store.select(selectOnTheAirTvSeries);
  topRatedTvSeries$ = this.store.select(selectTopRatedTvSeries);
  airingTodayTvSeries$ = this.store.select(selectAiringTodayTvSeries);

  showDefaultLists = true;

  onSearch(term: string) {
    this.showDefaultLists = false;
  }

  onClearSearch() {
    this.showDefaultLists = true;
  }

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private searchTermService: SearchTermService,
    private movieService: MovieService,
    private tvSeriesService: TvSeriesService,
    private TitleService: Title
  ) {}

  ngOnInit(): void {
    this.store.dispatch(clearSearchResults());
    this.movieService.getAllMedia();
    this.tvSeriesService.getAllMedia();
    this.TitleService.setTitle('Home | Entertainment web App');

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

  filterShows(): void {
    this.filteredShows = this.shows.filter((movie) =>
      movie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
