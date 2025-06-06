import * as express from "express"
import getMoviesRoute from "./get-movies"

const moviesRouter = express.Router()

moviesRouter.use("/", getMoviesRoute)

export default moviesRouter
