import { BookmarkController } from "@/controllers/bookmark/bookmark"
import checkToken from "@/middlewares/checktoken"
import { BookmarkRepository } from "@/repositories/bookmark/mongo-bookmark"
import * as express from "express"

const setBookmarkRoute = express.Router()

setBookmarkRoute.post("/", checkToken, async (req, res) => {
  const bodyFormated = {
    show_type: req.body.show_type,
    id: req.cookies.id,
    token: req.cookies.token,
    show_id: req.body.show_id,
  }
  const bookmarkRepository = new BookmarkRepository()

  const bookmarkController = new BookmarkController(bookmarkRepository)

  const { body, statusCode } = await bookmarkController.setBookmarkShows({
    body: bodyFormated,
  })

  res.status(statusCode).send(body)
})

export default setBookmarkRoute
