import * as express from "express"
import { SearchParam } from "@/controllers/search/protocols"
import { SearchController } from "@/controllers/search/search"
import checkToken from "@/middlewares/checktoken"
import { SearchRepository } from "@/repositories/search/search"

const searchRouter = express.Router()

searchRouter.post("/", checkToken, async (req, res) => {
  const bodyFormated = {
    ...req.body,
  }
  const searchRepository = new SearchRepository()

  const searchController = new SearchController(searchRepository)

  const { body, statusCode } = await searchController.handle(
    {
      body: bodyFormated as SearchParam,
    },
    res,
  )

  return res.status(statusCode).send(body)
})

export default searchRouter
