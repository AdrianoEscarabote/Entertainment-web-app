import validator from "validator"
import { HttpResponse, HttpRequest, IController } from "../protocols"
import { badRequest, logged, notFound } from "../helpers"
import {
  ILoginUserRepository,
  LoginUserParams,
  LoginUserReturn,
} from "./protocols"
import { Secret, sign } from "jsonwebtoken"
import { Response } from "express"
import { setCookies } from "@/utils/setCookies"

export class LoginUserController implements IController {
  constructor(private readonly loginUserRepository: ILoginUserRepository) {}

  async handle(
    httpRequest: HttpRequest<LoginUserParams>,
    res: Response<unknown>,
  ): Promise<HttpResponse<LoginUserReturn | string>> {
    try {
      const requiredFields = ["email", "password"]

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof LoginUserParams]?.length) {
          return badRequest(`Field ${field} is required`)
        }
      }

      const emailIsValid = validator.isEmail(httpRequest.body!.email)

      if (!emailIsValid) {
        return badRequest("E-mail is invalid")
      }

      if (!httpRequest?.body?.email) {
        return badRequest("Password is invalid!")
      }

      const user = await this.loginUserRepository.loginUser(httpRequest.body!)

      const secret = process.env.SECRET as Secret

      const token = sign(
        {
          id: user.id,
        },
        secret,
      )
      setCookies(res, user.id, token)

      return logged<LoginUserReturn>(user)
    } catch (error) {
      console.log(error)
      return notFound()
    }
  }
}
