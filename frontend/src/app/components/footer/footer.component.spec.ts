import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the footer component', () => {
    expect(component).toBeTruthy();
  });

  it('should render TMDb API link', () => {
    const tmdbLink = fixture.debugElement.query(
      By.css('a[href="https://www.themoviedb.org"]')
    );
    expect(tmdbLink).toBeTruthy();
    expect(tmdbLink.nativeElement.textContent).toContain('TMDb API');
  });

  it('should render TMDb logo image', () => {
    const img = fixture.debugElement.query(
      By.css('img[alt="Powered by TMDb"]')
    );
    expect(img).toBeTruthy();
    expect(img.nativeElement.getAttribute('src')).toContain('tmdb-logo.svg');
  });

  it('should render copyright with author', () => {
    const authorLink = fixture.debugElement.query(
      By.css('a[href="https://github.com/AdrianoEscarabote/"]')
    );
    expect(authorLink).toBeTruthy();
    expect(authorLink.nativeElement.textContent).toContain(
      'Adriano Escarabote'
    );
  });
});
