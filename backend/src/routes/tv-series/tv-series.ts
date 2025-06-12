import * as express from "express"
import getTvSeriesRoute from "./get-tv-series"

const tvSeriesRouter = express.Router()

tvSeriesRouter.use("/", getTvSeriesRoute)

export default tvSeriesRouter
