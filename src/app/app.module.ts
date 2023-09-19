// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './ngrx/app-reducer';
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
  ],
  imports: [BrowserModule, AppRoutingModule, StoreModule.forRoot(reducers)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
