// controller
import { SignupUserController } from "@/controllers/signup-user/signup-user"

// repository
import { MongoRegisterUserRepository } from "@/repositories/signup-user/mongo-signup-user"

// express
import * as express from "express"

const signupRoute = express.Router()

signupRoute.post("/", async (req, res) => {
  const registerUserRepository = new MongoRegisterUserRepository()

  const registerUserController = new SignupUserController(
    registerUserRepository,
  )

  const { body, statusCode } = await registerUserController.handle(
    {
      body: req.body,
    },
    res,
  )

  res.status(statusCode).send(body)
})

export default signupRoute
