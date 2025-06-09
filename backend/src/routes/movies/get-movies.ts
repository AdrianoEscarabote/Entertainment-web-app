import { GetMoviesController } from "@/controllers/get-movies/get-movies"

import checkToken from "@/middlewares/checktoken"
import { GetMoviesRepository } from "@/repositories/get-movies/get-movies"
import * as express from "express"

const getMoviesRoute = express.Router()

getMoviesRoute.post("/", checkToken, async (req, res) => {
  const bodyFormated = {
    id: req.cookies.id,
    token: req.cookies.token,
    type: req.body.type,
    ...req.body,
  }

  const getMoviesRepository = new GetMoviesRepository()

  const getMoviesController = new GetMoviesController(getMoviesRepository)

  const { body, statusCode } = await getMoviesController.getMovies(
    {
      body: bodyFormated,
    },
    res,
  )

  res.status(statusCode).send(body)
})

export default getMoviesRoute
