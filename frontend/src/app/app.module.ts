import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { LoginPage } from './pages/login/login.page';
import { SignupPage } from './pages/signup/signup.page';
import { HomePage } from './pages/home/home.page';
import { InputComponent } from './components/input/input.component';
import { MoviesComponent } from './components/movies/movies.component';
import { SeriesComponent } from './components/series/series.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { TrendingComponent } from './components/trending/trending.component';
import { MovieInfoComponent } from './components/movieInfo/movieInfo.component';
import { BookmarkButtonComponent } from './components/bookmark-button/bookmark-button.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { LanguageNamePipe } from './pipes/language-name.pipe';
import { SeeMoreButtonComponent } from './components/see-more-button/see-more-button.component';
import { MediaListComponent } from './components/media-list/media-list.component';
import { reducers } from './ngrx/app.reducer';
import { FooterComponent } from './components/footer/footer.component';
import { MediaGenrePage } from './pages/media-genre-page/media-genre.page';
import { MediaCardComponent } from './components/media-card/media-card.component';
import { MediaCategoryListComponent } from './components/media-category-list/media-category-list.component';
import { BookmarkedPage } from './pages/bookmarked/bookmarked.page';
import { MediaDetailsPage } from './pages/media-details-page/media-details.page';
import { SearchEffects } from './ngrx/search/search.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    LoginPage,
    SignupPage,
    HomePage,
    MoviesComponent,
    SeriesComponent,
    InputComponent,
    SeeMoreButtonComponent,
    AuthLayoutComponent,
    TrendingComponent,
    MovieInfoComponent,
    BookmarkButtonComponent,
    LogoutButtonComponent,
    MediaListComponent,
    MediaGenrePage,
    LanguageNamePipe,
    MediaCardComponent,
    MediaCategoryListComponent,
    BookmarkedPage,
    MediaDetailsPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([SearchEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      trace: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
