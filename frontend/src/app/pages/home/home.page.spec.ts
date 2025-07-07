import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MovieService } from 'src/app/service/movie.service';
import { TvSeriesService } from 'src/app/service/tv-series.service';
import { SearchTermService } from 'src/app/service/search-term.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import axios from 'axios';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let mockStore: any;
  let mockRouter: any;
  let mockMovieService: any;
  let mockTvSeriesService: any;
  let mockSearchTermService: any;
  let mockTitleService: any;

  beforeEach(async () => {
    mockStore = {
      select: jasmine.createSpy().and.returnValue(of([])),
    };

    mockRouter = {
      navigate: jasmine.createSpy(),
    };

    mockMovieService = {
      getAllMedia: jasmine.createSpy(),
    };

    mockTvSeriesService = {
      getAllMedia: jasmine.createSpy(),
    };

    mockSearchTermService = {};

    mockTitleService = {
      setTitle: jasmine.createSpy(),
    };

    await TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
        { provide: MovieService, useValue: mockMovieService },
        { provide: TvSeriesService, useValue: mockTvSeriesService },
        { provide: SearchTermService, useValue: mockSearchTermService },
        { provide: Title, useValue: mockTitleService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call movieService.getAllMedia and tvSeriesService.getAllMedia on init', () => {
    expect(mockMovieService.getAllMedia).toHaveBeenCalled();
    expect(mockTvSeriesService.getAllMedia).toHaveBeenCalled();
  });

  it('should set the page title correctly', () => {
    expect(mockTitleService.setTitle).toHaveBeenCalledWith(
      'Home | Entertainment web App'
    );
  });

  it('should navigate to login if token validation fails', () => {
    spyOn(axios, 'get').and.returnValue(Promise.reject({}));
    component.ngOnInit();
    fixture.detectChanges();

    setTimeout(() => {
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    }, 0);
  });
});
