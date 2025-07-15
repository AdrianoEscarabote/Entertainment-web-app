import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaDetailsPage } from './media-details.page';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppModule } from 'src/app/app.module';

describe('MediaDetailsPage', () => {
  let component: MediaDetailsPage;
  let fixture: ComponentFixture<MediaDetailsPage>;
  let store: Store;

  const mockMedia = {
    id: '1',
    title: 'Sample Movie',
    name: 'Sample TV Show',
    tagline: 'A great story',
    vote_average: 8.5,
    overview: 'This is a sample overview.',
    genres: [{ name: 'Action' }, { name: 'Drama' }],
    original_language: 'en',
    media_type: 'movie',
    runtime: 120,
    release_date: '2020-01-01',
    first_air_date: '2019-01-01',
    last_air_date: '2021-01-01',
    status: 'Released',
    homepage: 'https://sample.com',
    imdb_id: 'tt1234567',
    poster_path: '/poster.jpg',
    backdrop_path: '/backdrop.jpg',
    production_companies: [{ name: 'Sample Company', logo_path: '/logo.png' }],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediaDetailsPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'type' ? 'movie' : '1'),
              },
            },
          },
        },
        {
          provide: Store,
          useValue: { select: () => of(mockMedia), dispatch: () => {} },
        },
      ],
      imports: [AppModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaDetailsPage);
    component = fixture.componentInstance;
    /* component.media$ = of(mockMovie); */
    component.isBookmarked$ = of(false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the media title or name', () => {
    const titleElement = fixture.nativeElement.querySelector('h1');
    expect(titleElement).not.toBeNull();
    expect(titleElement.textContent).toContain('Sample Movie');
  });

  it('should display the media tagline', () => {
    const taglineElement = fixture.nativeElement.querySelector('p.HeadingXS');
    expect(taglineElement).not.toBeNull();
    expect(taglineElement.textContent).toContain('A great story');
  });

  it('should display genres', () => {
    const genreElements = fixture.nativeElement.querySelectorAll(
      '.bg-white.text-black'
    );
    expect(genreElements.length).toBe(2);
    expect(genreElements[0].textContent).toContain('Action');
    expect(genreElements[1].textContent).toContain('Drama');
  });

  it('should display the bookmark button', () => {
    const bookmarkButton = fixture.nativeElement.querySelector('button');
    expect(bookmarkButton).not.toBeNull();
  });
});
