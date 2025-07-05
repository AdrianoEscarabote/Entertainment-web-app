import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaCategoryListComponent } from './media-category-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MovieService } from 'src/app/service/movie.service';
import { TvSeriesService } from 'src/app/service/tv-series.service';
import { Title } from '@angular/platform-browser';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MediaCategoryListComponent', () => {
  let component: MediaCategoryListComponent;
  let fixture: ComponentFixture<MediaCategoryListComponent>;
  let mockStore: any;
  let mockRouter: any;
  let mockMovieService: any;
  let mockTvSeriesService: any;
  let mockTitleService: any;

  beforeEach(async () => {
    mockStore = {
      dispatch: jasmine.createSpy(),
      select: jasmine.createSpy().and.returnValue(of([])),
    };

    mockRouter = {
      url: '/movies/popular',
      navigate: jasmine.createSpy(),
    };

    mockMovieService = {
      getMoviesByType: jasmine.createSpy().and.returnValue(
        of({
          popular: {
            movies: [{ id: '1', title: 'Movie 1' }],
            page: 1,
            total_pages: 10,
          },
        })
      ),
    };

    mockTvSeriesService = {
      getTvByType: jasmine.createSpy().and.returnValue(
        of({
          popular: {
            tvSeries: [{ id: '1', name: 'TV Series 1' }],
            page: 1,
            total_pages: 10,
          },
        })
      ),
    };

    mockTitleService = {
      setTitle: jasmine.createSpy(),
    };

    await TestBed.configureTestingModule({
      declarations: [MediaCategoryListComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
        { provide: MovieService, useValue: mockMovieService },
        { provide: TvSeriesService, useValue: mockTvSeriesService },
        { provide: Title, useValue: mockTitleService },
        {
          provide: ActivatedRoute,
          useValue: {
            url: of([{ path: 'movies' }]),
            paramMap: of({
              get: (key: string) => (key === 'category' ? 'popular' : '1'),
            }),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize mediaType, category, and page', () => {
    expect(component.mediaType).toBe('movies');
    expect(component.category).toBe('popular');
    expect(component.page).toBe(1);
  });

  it('should fetch movies data and dispatch action', () => {
    expect(mockMovieService.getMoviesByType).toHaveBeenCalledWith(
      ['popular'],
      1
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: '[Movie API] Load All Movie Categories Success',
      data: {
        popular: {
          movies: [{ id: '1', title: 'Movie 1' }],
          page: 1,
          total_pages: 10,
        },
      },
    });
  });

  it('should set the page title correctly', () => {
    expect(mockTitleService.setTitle).toHaveBeenCalledWith('Popular | Movies');
  });

  it('should navigate to the correct page when goToPage is called', () => {
    component.goToPage(2);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/movies/popular/2']);
  });

  it('should capitalize category correctly', () => {
    const result = component.capitalizeWords('now-playing');
    expect(result).toBe('Now Playing');
  });
});
