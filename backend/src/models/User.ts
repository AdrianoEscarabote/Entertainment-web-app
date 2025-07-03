export interface UserTypes {
  email: string
  password: string
  id: string
  bookmarkedShows: {
    movies: string[]
    tvSeries: string[]
  }
}
