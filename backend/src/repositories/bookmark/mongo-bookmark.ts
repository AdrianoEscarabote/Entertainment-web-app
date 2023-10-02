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
      data: user.bookmarkedShows,
    }
  }
  async setBookmarkedShows(
    params: setBookmarkParams,
  ): Promise<setBookmarkReturn> {
    const user = await MongoClient.db.collection<MongoUser>("users").findOne({
      _id: new ObjectId(params.id),
    })

    if (!user) {
      throw new Error("user not found!")
    }

    if (user.bookmarkedShows.includes(params.title)) {
      const bookmarkedShows = user.bookmarkedShows.filter(
        (shows) => shows !== params.title,
      )
      await MongoClient.db.collection<MongoUser>("users").findOneAndUpdate(
        {
          _id: new ObjectId(params.id),
        },
        {
          $set: {
            bookmarkedShows: bookmarkedShows,
          },
        },
      )
      return {
        bookmarked: false,
      }
    }

    const updateUser = await MongoClient.db
      .collection<MongoUser>("users")
      .findOneAndUpdate(
        {
          _id: new ObjectId(params.id),
        },
        {
          $set: {
            bookmarkedShows: [...user.bookmarkedShows, params.title],
          },
        },
      )

    if (!updateUser) {
      throw new Error()
    }

    return {
      bookmarked: true,
    }
  }
}
