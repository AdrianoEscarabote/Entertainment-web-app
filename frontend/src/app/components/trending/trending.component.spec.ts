import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrendingComponent } from './trending.component';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { mockMovie } from 'src/app/mocks/movie.mock';

describe('TrendingComponent', () => {
  let component: TrendingComponent;
  let fixture: ComponentFixture<TrendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrendingComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    component.title = 'Trending Movies';
    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector('h2');
    expect(titleElement.textContent).toContain('Trending Movies');
  });

  it('should display the media type badge if hasSpecificMediaType$ is true', () => {
    component.mediaType = 'movies';
    component.hasSpecificMediaType$ = of(true);
    fixture.detectChanges();

    const badgeElement = fixture.nativeElement.querySelector(
      '.flex.items-center.gap-2'
    );
    expect(badgeElement).toBeTruthy();
    expect(badgeElement.textContent).toContain('Movies');
  });

  it('should not display the media type badge if hasSpecificMediaType$ is false', () => {
    component.hasSpecificMediaType$ = of(false);
    fixture.detectChanges();

    const badgeElement = fixture.nativeElement.querySelector(
      '.flex.items-center.gap-2'
    );
    expect(badgeElement).toBeNull();
  });

  it('should render trending items passed via items$ observable', () => {
    component.items$ = of([mockMovie, mockMovie]);
    fixture.detectChanges();

    const cardElements = fixture.nativeElement.querySelectorAll('.card-item');
    expect(cardElements.length).toBe(2);
    expect(cardElements[0].getAttribute('aria-label')).toContain(
      'The Godfather'
    );
    expect(cardElements[1].getAttribute('aria-label')).toContain(
      'The Godfather'
    );
  });

  it('should pass the correct title to movieInfo-component', () => {
    component.items$ = of([mockMovie]);
    component.mediaType = 'movies';
    fixture.detectChanges();

    const movieInfoComponent = fixture.nativeElement.querySelector(
      'movieInfo-component'
    );
    expect(movieInfoComponent).toBeTruthy();
    expect(movieInfoComponent.getAttribute('title')).toBe('The Godfather');
  });
});
