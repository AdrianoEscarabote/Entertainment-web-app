import { GetMoviesController } from "@/controllers/get-movies/get-movies"

import checkToken from "@/middlewares/checktoken"
import { GetMoviesRepository } from "@/repositories/get-movies/get-movies"
import * as express from "express"
import checktokenRoute from "../auth/checktoken"

const getMoviesRoute = express.Router()

getMoviesRoute.post("/", checkToken, async (req, res) => {
  const bodyFormated = {
    id: req.cookies.id,
    token: req.cookies.token,
    types: req.body.types,
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

getMoviesRoute.get("/genre-list", checkToken, async (req, res) => {
  const getMoviesRepository = new GetMoviesRepository()
  const getMoviesController = new GetMoviesController(getMoviesRepository)

  const { body, statusCode } = await getMoviesController.getMovieGenreList(
    {
      body: req.body,
    },
    res,
  )

  res.status(statusCode).send(body)
})

getMoviesRoute.post("/with-genre", checkToken, async (req, res) => {
  const getMoviesRepository = new GetMoviesRepository()

  const getMoviesController = new GetMoviesController(getMoviesRepository)

  const { body, statusCode } = await getMoviesController.getMoviesByCategory(
    {
      body: req.body,
    },
    res,
  )

  res.status(statusCode).send(body)
})

export default getMoviesRoute
