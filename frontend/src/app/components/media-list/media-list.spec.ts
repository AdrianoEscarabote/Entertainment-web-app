import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaListComponent } from './media-list.component';
import { Observable, of } from 'rxjs';
import { MediaItem } from 'src/app/ngrx/types';
import { By } from '@angular/platform-browser';
import { mockMovie } from 'src/app/mocks/movie.mock';
import { AppModule } from 'src/app/app.module';

describe('MediaListComponent', () => {
  let component: MediaListComponent;
  let fixture: ComponentFixture<MediaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediaListComponent],
      imports: [AppModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    component.title = 'Popular Movies';
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(titleElement.textContent).toContain('Popular Movies');
  });

  it('should display the media type badge if mediaType is valid', () => {
    component.mediaType = 'movie';
    fixture.detectChanges();

    const badgeElement = fixture.debugElement.query(
      By.css('.flex.items-center.gap-2')
    ).nativeElement;
    expect(badgeElement.textContent).toContain('Movie');
  });

  it('should render items passed via items$ observable', () => {
    const mockItems: MediaItem[] = [mockMovie, mockMovie];
    component.items$ = of(mockItems);
    fixture.detectChanges();

    const itemElements = fixture.debugElement.queryAll(By.css('.card-item'));
    expect(itemElements.length).toBe(2);
    expect(itemElements[0].nativeElement.getAttribute('aria-label')).toContain(
      'The Godfather'
    );
    expect(itemElements[1].nativeElement.getAttribute('aria-label')).toContain(
      'The Godfather'
    );
  });

  it('should set hasSpecificMediaType$ correctly based on items$', (done) => {
    const mockItems: MediaItem[] = [mockMovie, mockMovie];
    component.mediaType = 'movie';
    component.items$ = of(mockItems);
    fixture.detectChanges();

    component.hasSpecificMediaType$.subscribe((hasSpecificMediaType) => {
      expect(hasSpecificMediaType).toBeTrue();
      done();
    });
  });
});
