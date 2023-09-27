import * as express from "express"
import loginRoute from "./login"
import signupRoute from "./signup"

const authRouter = express.Router()

authRouter.use("/login", loginRoute)
authRouter.use("/signup", signupRoute)

export default authRouter
