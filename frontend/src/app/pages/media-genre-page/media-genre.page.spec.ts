import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaGenrePage } from './media-genre.page';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

// Mock ActivatedRoute
const activatedRouteStub = {
  snapshot: {
    paramMap: {
      get: (key: string) => {
        if (key === 'genre-name') return 'Action';
        if (key === 'genre-id') return '28';
        if (key === 'page') return '1';
        return null;
      },
    },
  },
};

// Mock Router
const routerStub = {
  url: '/movie/genre/28',
};

// Mock Store
const storeStub = {
  select: () => of({ movies: [], genre: '', currentPage: 1, totalPages: 1 }),
  dispatch: () => {},
};

describe('MediaGenrePage', () => {
  let component: MediaGenrePage;
  let fixture: ComponentFixture<MediaGenrePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediaGenrePage],
      imports: [HttpClientTestingModule], // Adicione aqui
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerStub },
        { provide: Store, useValue: storeStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaGenrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render genre title', () => {
    const h1 = fixture.debugElement.query(By.css('h1'));
    expect(h1.nativeElement.textContent).toContain('Action');
  });
});
