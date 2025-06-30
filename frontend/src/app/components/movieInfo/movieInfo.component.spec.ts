import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieInfoComponent } from './movieInfo.component';
import { AppModule } from 'src/app/app.module';

describe('MovieInfoComponent', () => {
  let component: MovieInfoComponent;
  let fixture: ComponentFixture<MovieInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieInfoComponent],
      imports: [AppModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieInfoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render movie details correctly', () => {
    component.title = 'Beyond Earth';
    component.media_type = 'Movie';
    component.release_date = '2023-05-15';

    fixture.detectChanges();

    const movieTitleElement = fixture.nativeElement.querySelector('h4');
    const categoryElement = fixture.nativeElement.querySelector('.category');
    const yearElement = fixture.nativeElement.querySelector('.year');
    const ratingElement = fixture.nativeElement.querySelector('.rating');

    expect(movieTitleElement).toBeTruthy();
    expect(categoryElement).toBeTruthy();
    expect(yearElement).toBeTruthy();
    expect(ratingElement).toBeTruthy();

    expect(movieTitleElement.textContent).toContain('Beyond Earth');
    expect(categoryElement.textContent).toContain('Movie');
    expect(yearElement.textContent).toContain('2019');
    expect(ratingElement.textContent).toContain('PG');
  });
});
