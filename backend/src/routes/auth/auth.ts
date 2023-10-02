import * as express from "express"
import loginRoute from "./login"
import signupRoute from "./signup"
import checktokenRoute from "./checktoken"

const authRouter = express.Router()

authRouter.use("/login", loginRoute)
authRouter.use("/signup", signupRoute)
authRouter.use("/checktoken", checktokenRoute)

export default authRouter
