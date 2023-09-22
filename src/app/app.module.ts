// app.module.ts

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
import { BookmarkedComponent } from './components/bookmarked/bookmarked.component';
import { HomeComponent } from './components/home/home.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { TrendingComponent } from './components/trending/trending.component';
import { RecommendedComponent } from './components/recommended/recommended.component';
import { MovieInfoComponent } from './components/movieInfo/movieInfo.component';
import { BookmarkButtonComponent } from './components/bookmarkButton/BookmarkButton.component';
import { HttpClientModule } from '@angular/common/http';
import { movieReducer } from './ngrx/movie.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    LoginPage,
    SignupPage,
    HomePage,
    MoviesComponent,
    SeriesComponent,
    BookmarkedComponent,
    HomeComponent,
    InputComponent,
    AuthLayoutComponent,
    TrendingComponent,
    RecommendedComponent,
    MovieInfoComponent,
    BookmarkButtonComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({ movie: movieReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
