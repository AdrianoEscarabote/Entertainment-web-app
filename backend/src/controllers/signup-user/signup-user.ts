import { Response } from "express"
import { HttpRequest, HttpResponse, IController } from "../protocols"
import {
  ISignupUserRepository,
  RegisterUserParams,
  RegisterUserReturn,
} from "./protocols"
import validator from "validator"
import { Conflict, badRequest, registered } from "../helpers"
import { setCookies } from "@/utils/setCookies"
import { Secret, sign } from "jsonwebtoken"

export class SignupUserController implements IController {
  constructor(private readonly registerUserRepository: ISignupUserRepository) {}

  async handle(
    httpRequest: HttpRequest<RegisterUserParams>,
    res: Response<unknown>,
  ): Promise<HttpResponse<RegisterUserReturn | string>> {
    try {
      const requiredFields = ["email", "password", "confirmpassword"]
      console.log(httpRequest.body)

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof RegisterUserParams]?.length) {
          return badRequest(`Field ${field} is required`)
        }
      }

      const emailIsValid = validator.isEmail(httpRequest.body!.email)

      if (!emailIsValid) {
        return badRequest("E-mail is invalid")
      }

      if (httpRequest?.body?.confirmpassword !== httpRequest?.body?.password) {
        throw new Error("Password and confirmation password must match")
      }

      const user = await this.registerUserRepository.registerUser(
        httpRequest.body!,
      )

      const expirationDate = new Date()
      expirationDate.setDate(expirationDate.getDate() + 30)

      const secret = process.env.SECRET as Secret

      const token = sign(
        {
          id: user.id,
        },
        secret,
      )

      setCookies(res, user.id, token)

      return registered<RegisterUserReturn>(user)
    } catch (error) {
      return Conflict()
    }
  }
}
