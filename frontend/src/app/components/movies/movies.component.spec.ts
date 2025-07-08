import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesComponent } from './movies.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const storeStub = {
  select: () => of({ movies: [], genre: '', currentPage: 1, totalPages: 1 }),
  dispatch: () => {},
};

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: Store, useValue: storeStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    component.genres = of([{ id: 1, name: 'Action' }]);
    component.basePath = 'movies';
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render genres as cards', () => {
    const cardElements = fixture.nativeElement.querySelectorAll('.card');
    expect(cardElements.length).toBe(2);
    expect(cardElements[0].textContent.trim()).toBe('Action');
  });
});
