import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadTvSeriesDetails } from 'src/app/ngrx/tv-series/tv-series.actions';
import { selectTvSeriesDetails } from 'src/app/ngrx/tv-series/tv-series.selectors';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'tv-page',
  templateUrl: './tv.page.html',
})
export class TvPage implements OnInit {
  tvSeriesId!: string;

  tvSerie$ = this.store.select(selectTvSeriesDetails);

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.tvSeriesId = this.route.snapshot.paramMap.get('id')!;
    this.movieService
      .getTVSeriesDetails(this.tvSeriesId)
      .subscribe((tvSeriesDetails: any) => {
        this.store.dispatch(
          loadTvSeriesDetails({ tvSeriesDetails: tvSeriesDetails })
        );
      });
  }
}
