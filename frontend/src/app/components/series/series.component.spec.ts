import { AppModule } from 'src/app/app.module';
import { SeriesComponent } from './series.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const storeStub = {
  select: () => of({ movies: [], genre: '', currentPage: 1, totalPages: 1 }),
  dispatch: () => {},
};

describe('SeriesComponent', () => {
  let component: SeriesComponent;
  let fixture: ComponentFixture<SeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeriesComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: Store, useValue: storeStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesComponent);
    component = fixture.componentInstance;
    component.genres = of([{ id: 1, name: 'Action & Adventure' }]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render genres as cards', () => {
    const cardElements = fixture.nativeElement.querySelectorAll('.card');
    expect(cardElements.length).toBe(2);
    expect(cardElements[0].textContent.trim()).toBe('Action & Adventure');
  });
});
