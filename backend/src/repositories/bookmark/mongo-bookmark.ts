import { ChecktokenParams } from "@/controllers/checktoken/protocols"
import { MongoClient } from "@/database/mongo"
import { MongoUser } from "../mongo-protocols"
import { ObjectId } from "mongodb"
import {
  BookmarkReturn,
  IBookmarkRepository,
  setBookmarkParams,
  setBookmarkReturn,
} from "@/controllers/bookmark/protocols"

export class BookmarkRepository implements IBookmarkRepository {
  async getBookmarkedShows(params: ChecktokenParams): Promise<BookmarkReturn> {
    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: new ObjectId(params.id) })

    if (!user) {
      throw new Error()
    }

    return {
      movies: user.bookmarkedShows.movies,
      tvSeries: user.bookmarkedShows.tvSeries,
    }
  }

  async setBookmarkedShows(
    params: setBookmarkParams,
  ): Promise<setBookmarkReturn> {
    const { id, show_type, show_id } = params

    const user = await MongoClient.db.collection<MongoUser>("users").findOne({
      _id: new ObjectId(id),
    })

    if (!user) {
      throw new Error("user not found!")
    }

    if (show_type !== "movies" && show_type !== "tv-series") {
      throw new Error("show_type must be 'movies' or 'tv-series'")
    }

    const isBookmarked =
      (show_type === "movies" &&
        user.bookmarkedShows.movies.includes(show_id)) ||
      (show_type === "tv-series" &&
        user.bookmarkedShows.tvSeries.includes(show_id))

    let update: Partial<MongoUser["bookmarkedShows"]> = {}

    if (isBookmarked) {
      if (show_type === "movies") {
        update.movies = user.bookmarkedShows.movies.filter(
          (id) => id !== show_id,
        )
      } else {
        update.tvSeries = user.bookmarkedShows.tvSeries.filter(
          (id) => id !== show_id,
        )
      }
    } else {
      if (show_type === "movies") {
        update.movies = [...user.bookmarkedShows.movies, show_id]
      } else {
        update.tvSeries = [...user.bookmarkedShows.tvSeries, show_id]
      }
    }

    await MongoClient.db.collection<MongoUser>("users").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          [`bookmarkedShows.${show_type === "movies" ? "movies" : "tvSeries"}`]:
            update[show_type === "movies" ? "movies" : "tvSeries"],
        },
      },
    )

    return {
      bookmarked: !isBookmarked,
    }
  }
}
