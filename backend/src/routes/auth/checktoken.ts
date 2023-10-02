import { ChecktokenController } from "@/controllers/checktoken/checktoken"
import { ChecktokenRepository } from "@/repositories/checktoken/mongo-checktoken"
import * as express from "express"

const checktokenRoute = express.Router()

checktokenRoute.get("", async (req, res) => {
  const token = req.cookies.token
  const id = req.cookies.id

  const bodyFormated = {
    token,
    id,
  }

  const checktokenRepository = new ChecktokenRepository()

  const checktokenController = new ChecktokenController(checktokenRepository)

  const { body, statusCode } = await checktokenController.handle({
    body: bodyFormated,
  })

  res.status(statusCode).send(body)
})

export default checktokenRoute
