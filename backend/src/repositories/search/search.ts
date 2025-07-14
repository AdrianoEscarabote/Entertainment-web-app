import {
  ISearchRepository,
  SeachReturn,
  SearchParam,
} from "@/controllers/search/protocols"
import axios from "axios"

export class SearchRepository implements ISearchRepository {
  async getSearchByQuery(params: SearchParam): Promise<SeachReturn> {
    const { query, type } = params

    const url =
      type === "movie"
        ? "https://api.themoviedb.org/3/search/movie"
        : "https://api.themoviedb.org/3/search/tv"

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
      .catch((error) =>
        console.error("Error fetching search results by query:", error),
      )

    if (response === undefined) {
      throw new Error("Failed to fetch search results by query")
    }

    return {
      results: response.results,
      page: response.page,
      total_pages: response.total_pages,
    }
  }

  async getSearchByGenre(params: SearchParam): Promise<SeachReturn> {
    const { genre, query, type } = params

    const url =
      type === "movie"
        ? "https://api.themoviedb.org/3/search/movie"
        : "https://api.themoviedb.org/3/search/tv"

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
        console.error("Error fetching search results by genre:", error)
        throw new Error("Failed to fetch search results by genre")
      })

    if (!response || !response.results) {
      throw new Error("No results found")
    }

    const filteredResults = response.results.filter((item: any) =>
      item.genre_ids.includes(Number(genre)),
    )

    return {
      results: filteredResults,
      page: response.page,
      total_pages: response.total_pages,
    }
  }

  async getSearchByCategory(params: SearchParam): Promise<SeachReturn> {
    const { category, query, type } = params

    const movieCategories = [
      "popular",
      "top_rated",
      "upcoming",
      "now_playing",
    ] as const
    const tvCategories = [
      "popular",
      "top_rated",
      "on_the_air",
      "airing_today",
    ] as const

    type MovieCategory = (typeof movieCategories)[number]
    type TvCategory = (typeof tvCategories)[number]

    const categoryUrlMap: {
      movie: Record<MovieCategory, string>
      tv: Record<TvCategory, string>
    } = {
      movie: {
        popular: "https://api.themoviedb.org/3/movie/popular",
        top_rated: "https://api.themoviedb.org/3/movie/top_rated",
        upcoming: "https://api.themoviedb.org/3/movie/upcoming",
        now_playing: "https://api.themoviedb.org/3/movie/now_playing",
      },
      tv: {
        popular: "https://api.themoviedb.org/3/tv/popular",
        top_rated: "https://api.themoviedb.org/3/tv/top_rated",
        on_the_air: "https://api.themoviedb.org/3/tv/on_the_air",
        airing_today: "https://api.themoviedb.org/3/tv/airing_today",
      },
    }

    let url: string | undefined

    if (
      type === "movie" &&
      movieCategories.includes(category.toLowerCase() as MovieCategory)
    ) {
      url = categoryUrlMap.movie[category.toLowerCase() as MovieCategory]
    } else if (
      type === "tv" &&
      tvCategories.includes(category.toLowerCase() as TvCategory)
    ) {
      url = categoryUrlMap.tv[category.toLowerCase() as TvCategory]
    }

    if (!url) {
      throw new Error(`Invalid category: ${category}`)
    }

    const response = await axios
      .get(url, {
        headers: {
          accept: "application/json",
          Authorization: `${process.env.TMDB_API_KEY}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching search results by category:", error)
        throw new Error("Failed to fetch search results by category")
      })

    if (!response || !response.results) {
      throw new Error("No results found")
    }

    const filteredResults = response.results.filter(
      (item: any) =>
        item.title?.toLowerCase().includes(query.toLowerCase()) ||
        item.original_title?.toLowerCase().includes(query.toLowerCase()),
    )

    const totalPages = Math.ceil(
      filteredResults.length / response.results.length,
    )

    return {
      results: filteredResults,
      page: response.page,
      total_pages: totalPages,
    }
  }
}
