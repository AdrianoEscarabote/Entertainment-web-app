import { LogoutUserController } from "@/controllers/logout-user/logout-user"
import checkToken from "@/middlewares/checktoken"
import * as express from "express"

const logoutRoute = express.Router()

logoutRoute.post("/", checkToken, async (req, res) => {
  const logoutuserController = new LogoutUserController()

  const { body, statusCode } = await logoutuserController.handle(
    {
      body: req.body,
    },
    res,
  )

  res.status(statusCode).send(body)
})

export default logoutRoute
