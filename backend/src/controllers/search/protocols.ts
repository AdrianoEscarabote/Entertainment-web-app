import { ShowType } from "@/models/Show"

export interface SearchParam {
  type: "movie" | "tv"
  genre: number[]
  query: string
  category: string
}

export interface SeachReturn {
  results: ShowType[]
  page: number
  total_pages: number
}

export interface ISearchRepository {
  getSearchByGenre(params: SearchParam): Promise<SeachReturn>
  getSearchByQuery(params: SearchParam): Promise<SeachReturn>
  getSearchByCategory(params: SearchParam): Promise<SeachReturn>
}
