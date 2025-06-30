import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaCardComponent } from './media-card.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'movieInfo-component',
  template: '',
})
class MockMovieInfoComponent {
  @Input() title!: string;
  @Input() media_type!: string;
  @Input() release_date!: string;
  @Input() show_shadow!: boolean;
}

describe('MediaCardComponent', () => {
  let component: MediaCardComponent;
  let fixture: ComponentFixture<MediaCardComponent>;

  const mockMovie = {
    id: 123,
    title: 'Test Movie',
    name: 'Test TV',
    backdrop_path: '/test.jpg',
    release_date: '2022-01-01',
    first_air_date: '2021-01-01',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediaCardComponent, MockMovieInfoComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaCardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    component.item = mockMovie as any;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render the image with correct src and alt', () => {
    component.item = mockMovie as any;
    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('img'));
    expect(img).toBeTruthy();
    expect(img.nativeElement.getAttribute('src')).toContain('/test.jpg');
    expect(img.nativeElement.getAttribute('alt')).toContain('Test Movie');
  });

  it('should set routerLink to /movie/:id when isTv is false', () => {
    component.item = mockMovie as any;
    component.isTv = false;
    fixture.detectChanges();
    const a = fixture.debugElement.query(By.css('a'));
    expect(a).toBeTruthy();
    expect(a.attributes['ng-reflect-router-link']).toContain('/,movie,123');
  });

  it('should set routerLink to /tv/:id when isTv is true', () => {
    component.item = mockMovie as any;
    component.isTv = true;
    fixture.detectChanges();
    const a = fixture.debugElement.query(By.css('a'));
    expect(a).toBeTruthy();
    expect(a.attributes['ng-reflect-router-link']).toContain('/,tv,123');
  });

  it('should render movieInfo-component with correct inputs for movie', () => {
    component.item = mockMovie as any;
    component.isTv = false;
    fixture.detectChanges();
    const info = fixture.debugElement.query(
      By.directive(MockMovieInfoComponent)
    );
    expect(info).toBeTruthy();
    expect(info.componentInstance.title).toBe('Test Movie');
    expect(info.componentInstance.media_type).toBe('movie');
    expect(info.componentInstance.release_date).toBe('2022-01-01');
    expect(info.componentInstance.show_shadow).toBe(false);
  });

  it('should render movieInfo-component with correct inputs for tv', () => {
    component.item = mockMovie as any;
    component.isTv = true;
    fixture.detectChanges();
    const info = fixture.debugElement.query(
      By.directive(MockMovieInfoComponent)
    );
    expect(info).toBeTruthy();
    expect(info.componentInstance.title).toBe('Test TV');
    expect(info.componentInstance.media_type).toBe('tv-series');
    expect(info.componentInstance.release_date).toBe('2021-01-01');
    expect(info.componentInstance.show_shadow).toBe(false);
  });
});
