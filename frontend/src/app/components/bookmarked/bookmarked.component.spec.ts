import { AppModule } from 'src/app/app.module';
import { BookmarkedComponent } from './bookmarked.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('BookmarkedComponent', () => {
  let component: BookmarkedComponent;
  let fixture: ComponentFixture<BookmarkedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookmarkedComponent],
      imports: [AppModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkedComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
