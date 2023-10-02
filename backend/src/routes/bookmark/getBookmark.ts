import { BookmarkController } from "@/controllers/bookmark/bookmark"
import checkToken from "@/middlewares/checktoken"
import { BookmarkRepository } from "@/repositories/bookmark/mongo-bookmark"
import * as express from "express"

const getBookmarkRoute = express.Router()

getBookmarkRoute.get("/", checkToken, async (req, res) => {
  const bodyFormated = {
    id: req.cookies.id,
    token: req.cookies.token,
  }
  const bookmarkRepository = new BookmarkRepository()

  const bookmarkController = new BookmarkController(bookmarkRepository)

  const { body, statusCode } = await bookmarkController.getBookmarkShows({
    body: bodyFormated,
  })

  res.status(statusCode).send(body)
})

export default getBookmarkRoute
