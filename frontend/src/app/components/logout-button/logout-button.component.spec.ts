import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoutButtonComponent } from './logout-button.component';
import { AppModule } from 'src/app/app.module';

describe('LogoutButtonComponent', () => {
  let component: LogoutButtonComponent;
  let fixture: ComponentFixture<LogoutButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoutButtonComponent],
      imports: [AppModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display logout button when loading is false and logout option is open', () => {
    component.loading = false;
    component.logoutOptionOpen = true;

    fixture.detectChanges();

    const loaderCircle = fixture.nativeElement.querySelector('.loader-circle');

    const logoutButton = fixture.nativeElement.querySelector('button');

    expect(logoutButton).toBeTruthy();
    expect(loaderCircle).toBeFalsy();
  });
});
