import * as express from "express"
import getBookmarkRoute from "./getBookmark"
import setBookmarkRoute from "./setBookmark"

const bookmarkRouter = express.Router()

bookmarkRouter.use("/get", getBookmarkRoute)
bookmarkRouter.use("/set", setBookmarkRoute)

export default bookmarkRouter
