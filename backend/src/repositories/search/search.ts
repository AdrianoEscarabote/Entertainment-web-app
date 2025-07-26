import {
  ISearchRepository,
  SeachReturn,
  SearchParam,
} from "@/controllers/search/protocols"
import axios from "axios"

export class SearchRepository implements ISearchRepository {
  async search(params: SearchParam): Promise<SeachReturn> {
    const { query, type } = params
    if (type !== "movie" && type !== "tv" && type !== "multi") {
      throw new Error("Invalid search type")
    }

    const page = params.page || 1
    const url = `https://api.themoviedb.org/3/search/${type}?page=${page}`

    const response = await axios
      .get(url, {
        params: {
          query,
          include_adult: false,
        },
        headers: {
          accept: "application/json",
          Authorization: `${process.env.TMDB_API_KEY}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching search results by query:", error)
        throw new Error("Failed to fetch search results by query")
      })

    if (!response || !response.results) {
      throw new Error("No results found")
    }

    const filteredResults = response.results.map((item: any) => {
      if (!item.backdrop_path) {
        return { ...item, backdrop_path: item.poster_path }
      }
      return item
    })

    return {
      results: filteredResults,
      page: response.page,
      total_pages: response.total_pages,
    }
  }
}
