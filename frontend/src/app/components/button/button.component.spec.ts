import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { AppModule } from 'src/app/app.module';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
      imports: [AppModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render button with correct text and type', () => {
    component.buttonText = 'Click Me';
    component.buttonType = 'submit';
    component.loading = false;

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    const buttonText = button.querySelector('span');
    const loaderCircle = fixture.nativeElement.querySelector('.loader-circle');

    expect(loaderCircle).toBeFalsy();
    expect(button).toBeTruthy();
    expect(buttonText.textContent).toContain('Click Me');
    expect(button.getAttribute('type')).toBe('submit');
  });
});
