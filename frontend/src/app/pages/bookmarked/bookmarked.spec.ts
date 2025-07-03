import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookmarkedPage } from './bookmarked.page';
import { By } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';
import { mockTvSeries } from 'src/app/mocks/tv-series.mock';
import { mockMovie } from 'src/app/mocks/movie.mock';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { activatedRouteStub, storeStub } from 'src/app/tests-mocks';

@Component({
  selector: 'media-card',
  template: '',
})
class MockMediaCardComponent {
  @Input() item: any;
  @Input() isTv?: boolean;
}

const routerStub = {
  url: '/movie/genre/28',
};

describe('BookmarkedPage', () => {
  let component: BookmarkedPage;
  let fixture: ComponentFixture<BookmarkedPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookmarkedPage, MockMediaCardComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerStub },
        { provide: Store, useValue: storeStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display the title "Favorite Movies"', () => {
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(title.textContent).toContain('Favorite Movies');
  });

  it('should render a media-card for each movie', () => {
    component.movieItems = [mockMovie, mockMovie];
    fixture.detectChanges();
    const cards = fixture.debugElement.queryAll(By.css('media-card'));
    expect(cards.length).toBe(2);
  });

  it('should render a media-card for each TV series', () => {
    component.seriesItems = [mockTvSeries, mockTvSeries, mockTvSeries];
    component.movieItems = [];
    fixture.detectChanges();
    const cards = fixture.debugElement.queryAll(By.css('media-card'));
    expect(cards.length).toBe(3);
  });

  it('should pass [isTv]="true" to media-card for TV series', () => {
    component.seriesItems = [mockTvSeries];
    fixture.detectChanges();
    const card = fixture.debugElement.queryAll(By.css('media-card'))[0];
    expect(card.componentInstance.isTv).toBeTrue();
  });
});
