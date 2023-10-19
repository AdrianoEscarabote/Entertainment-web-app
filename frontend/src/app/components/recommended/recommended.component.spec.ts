import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecommendedComponent } from './recommended.component';
import { AppModule } from 'src/app/app.module';
import { of } from 'rxjs';

describe('RecommendedComponent', () => {
  let component: RecommendedComponent;
  let fixture: ComponentFixture<RecommendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecommendedComponent],
      imports: [AppModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display recommended movies', () => {
    const mockMovies = [
      {
        thumbnailLarge: 'path/to/thumbnail.jpg',
        isBookmarked: true,
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

    fixture.detectChanges();

    const movieCards = fixture.nativeElement.querySelectorAll('.card');
    expect(movieCards.length).toBeGreaterThan(0);
  });
});
