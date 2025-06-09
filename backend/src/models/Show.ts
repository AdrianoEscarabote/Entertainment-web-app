export interface ShowType {
  id: string
  title: string
  is_bookmarked: boolean
  rating: string
  release_date: string
  overview: string
  genres: string[]
  media_type: "movie" | "tv"
  backdrop_path: string
  poster_path: string
}
