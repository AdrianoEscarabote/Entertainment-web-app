import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeeMoreButtonComponent } from './see-more-button.component';
import { AppModule } from 'src/app/app.module';
import { By } from '@angular/platform-browser';

describe('SeeMoreButtonComponent', () => {
  let component: SeeMoreButtonComponent;
  let fixture: ComponentFixture<SeeMoreButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeeMoreButtonComponent],
      imports: [AppModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeMoreButtonComponent);
    component = fixture.componentInstance;
    component.ariaLabel = 'Test Aria Label';
    component.href = '/test-link';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render button with correct text', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.textContent.trim()).toBe('See More');
  });

  it('should set the correct aria-label', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.attributes['aria-label']).toBe('Test Aria Label');
  });

  it('should set the correct routerLink', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.attributes['ng-reflect-router-link']).toBe('/test-link');
  });
});
