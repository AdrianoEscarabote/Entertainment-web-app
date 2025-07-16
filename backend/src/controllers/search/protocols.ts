import { ShowType } from "@/models/Show"

export interface SearchParam {
  type: "movie" | "tv" | "multi"
  query: string
}

export interface SeachReturn {
  results: ShowType[]
  page: number
  total_pages: number
}

export interface ISearchRepository {
  search(params: SearchParam): Promise<SeachReturn>
}
