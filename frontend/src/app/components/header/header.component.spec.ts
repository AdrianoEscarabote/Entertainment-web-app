import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AppModule } from 'src/app/app.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [AppModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set active class for home button when activeRoute is home', () => {
    component.activeRoute = 'home';
    fixture.detectChanges();
    const homeButton = fixture.nativeElement.querySelector(
      '[routerLink="/home"]'
    );
    expect(homeButton.classList.contains('active')).toBe(true);
  });

  it('should change route and set active to another button', fakeAsync(() => {
    component.activeRoute = 'home';

    const moviesButton = fixture.nativeElement.querySelector(
      '[routerLink="/movies"]'
    );
    moviesButton.click();
    tick(); // Wait for asynchronous operations to complete

    fixture.detectChanges();

    expect(moviesButton.classList.contains('active')).toBe(true);

    const homeButton = fixture.nativeElement.querySelector(
      '[routerLink="/home"]'
    );
    expect(homeButton.classList.contains('active')).toBe(false);
  }));
});
