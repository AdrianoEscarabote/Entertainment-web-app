import * as express from "express"
import loginRoute from "./login"
import signupRoute from "./signup"
import checktokenRoute from "./checktoken"
import logoutRoute from "./logout"

const authRouter = express.Router()

authRouter.use("/login", loginRoute)
authRouter.use("/signup", signupRoute)
authRouter.use("/checktoken", checktokenRoute)
authRouter.use("/logout", logoutRoute)

export default authRouter
