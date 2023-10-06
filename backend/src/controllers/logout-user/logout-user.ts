import { Response } from "express"
import { HttpRequest, HttpResponse, IController } from "../protocols"
import { LogoutUserReturn } from "./protocols"
import { clearCookies } from "@/utils/clearCookies"
import { badRequest, ok } from "../helpers"

export class LogoutUserController implements IController {
  async handle(
    httpRequest: HttpRequest<unknown>,
    res: Response<unknown>,
  ): Promise<HttpResponse<LogoutUserReturn | string>> {
    try {
      clearCookies(res)

      return ok<LogoutUserReturn>(true)
    } catch (error) {
      return badRequest("server error!")
    }
  }
}
