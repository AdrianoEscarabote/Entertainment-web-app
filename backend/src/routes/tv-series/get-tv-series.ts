import { GetTvSeriesController } from "@/controllers/get-tv-series/get-tv-series"
import checkToken from "@/middlewares/checktoken"
import { GetTvSeriesRepository } from "@/repositories/get-tv-series/get-tv-series"
import * as express from "express"

const getTvSeriesRoute = express.Router()

getTvSeriesRoute.post("/", checkToken, async (req, res) => {
  const bodyFormated = {
    id: req.cookies.id,
    token: req.cookies.token,
    types: req.body.types,
    ...req.body,
  }

  const getTvSeriesRepository = new GetTvSeriesRepository()
  const getTvSeriesController = new GetTvSeriesController(getTvSeriesRepository)

  const { body, statusCode } = await getTvSeriesController.getTvSeries(
    {
      body: bodyFormated,
    },
    res,
  )

  return res.status(statusCode).send(body)
})

getTvSeriesRoute.get("/genre-list", checkToken, async (req, res) => {
  const getTvSeriesRepository = new GetTvSeriesRepository()
  const getTvSeriesController = new GetTvSeriesController(getTvSeriesRepository)

  const { body, statusCode } = await getTvSeriesController.getTvSeriesGenreList(
    {
      body: req.body,
    },
    res,
  )

  return res.status(statusCode).send(body)
})

getTvSeriesRoute.post("/by-genre", checkToken, async (req, res) => {
  const getTvSeriesRepository = new GetTvSeriesRepository()
  const getTvSeriesController = new GetTvSeriesController(getTvSeriesRepository)

  const { body, statusCode } = await getTvSeriesController.getTvSeriesByGenre(
    {
      body: req.body,
    },
    res,
  )

  return res.status(statusCode).send(body)
})

export default getTvSeriesRoute
