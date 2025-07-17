import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { SignupPage } from './pages/signup/signup.page';
import { MoviesComponent } from './components/movies/movies.component';
import { SeriesComponent } from './components/series/series.component';
import { MediaGenrePage } from './pages/media-genre-page/media-genre.page';
import { MediaCategoryListComponent } from './components/media-category-list/media-category-list.component';
import { BookmarkedPage } from './pages/bookmarked/bookmarked.page';
import { HomePage } from './pages/home/home.page';
import { MediaDetailsPage } from './pages/media-details-page/media-details.page';

const routes: Routes = [
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
  { path: 'home', component: HomePage },
  { path: 'movies', component: MoviesComponent },
  { path: 'tv-series', component: SeriesComponent },
  { path: 'bookmarked', component: BookmarkedPage },
  { path: 'movies/:category/:page', component: MediaCategoryListComponent },
  { path: 'tv-series/:category/:page', component: MediaCategoryListComponent },
  {
    path: 'movies/genre/:genre-name/:genre-id/:page',
    component: MediaGenrePage,
  },
  {
    path: 'tv-series/genre/:genre-name/:genre-id/:page',
    component: MediaGenrePage,
  },
  { path: 'media/:type/:id', component: MediaDetailsPage },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
