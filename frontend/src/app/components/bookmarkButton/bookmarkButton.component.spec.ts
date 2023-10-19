import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookmarkButtonComponent } from './BookmarkButton.component';
import { AppModule } from 'src/app/app.module';

describe('BookmarkButtonComponent', () => {
  let component: BookmarkButtonComponent;
  let fixture: ComponentFixture<BookmarkButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookmarkButtonComponent],
      imports: [AppModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render bookmark button with correct images based on input values', () => {
    component.showTitle = 'exampleTitle';
    component.showBookmarkedImg = false;

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    const emptyBookmarkIcon = button.querySelector(
      'img[src$="icon-bookmark-empty.svg"]'
    );
    const fullBookmarkIcon = button.querySelector(
      'img[src$="icon-bookmark-full.svg"]'
    );

    expect(emptyBookmarkIcon).toBeTruthy();
    expect(fullBookmarkIcon).toBeFalsy();
  });
});
