import * as express from "express"
import getMoviesRouter from "./get-movies"

const moviesRouter = express.Router()

moviesRouter.use("/", getMoviesRouter)

export default moviesRouter
