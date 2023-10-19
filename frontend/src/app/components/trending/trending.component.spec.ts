import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrendingComponent } from './trending.component';
import { AppModule } from 'src/app/app.module';
import { of } from 'rxjs';

describe('TrendingComponent', () => {
  let component: TrendingComponent;
  let fixture: ComponentFixture<TrendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrendingComponent],
      imports: [AppModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display trending movies', () => {
    const mockMovies = [
      {
        thumbnailLarge: 'path/to/thumbnail.jpg',
        thumbnailSmall: 'path/to/thumbnail.jpg',
        isBookmarked: true,
        isTrending: true,
        movieData: {
          title: 'Sample Movie',
          year: '2023',
          category: 'Action',
          rating: 'PG-13',
        },
      },
    ];

    component.movies$ = of(mockMovies);

    fixture.detectChanges();

    const trendingCards = fixture.nativeElement.querySelectorAll('.card');
    expect(trendingCards.length).toBeGreaterThan(0);
  });
});
