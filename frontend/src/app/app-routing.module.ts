import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { SignupPage } from './pages/signup/signup.page';
import { MoviesComponent } from './components/movies/movies.component';
import { SeriesComponent } from './components/series/series.component';
import { HomeComponent } from './components/home/home.component';
import { MoviePage } from './pages/movie/movie.page';
import { TvPage } from './pages/tv/tv.page';
import { MediaGenrePage } from './pages/media-genre-page/media-genre.page';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'tv-series', component: SeriesComponent },
  {
    path: 'movies/genre/:genre-name/:genre-id/:page',
    component: MediaGenrePage,
  },
  {
    path: 'tv-series/genre/:genre-name/:genre-id/:page',
    component: MediaGenrePage,
  },
  { path: 'movie/:id', component: MoviePage },
  { path: 'tv/:id', component: TvPage },
  {
    path: 'login',
    component: LoginPage,
    data: { layout: 'auth' },
  },
  {
    path: 'signup',
    component: SignupPage,
    data: { layout: 'auth' },
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
