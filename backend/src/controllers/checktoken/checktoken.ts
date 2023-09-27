import { HttpRequest, HttpResponse, IController } from "../protocols"
import {
  ChecktokenParams,
  ChecktokenReturn,
  IChecktokenRepository,
} from "./protocols"
import { badRequest, ok } from "../helpers"

export class ChecktokenController implements IController {
  constructor(private readonly ChecktokenRepository: IChecktokenRepository) {}

  async handle(
    httpRequest: HttpRequest<ChecktokenParams>,
  ): Promise<HttpResponse<ChecktokenReturn | string>> {
    try {
      if (!httpRequest.body?.token || !httpRequest.body.id) {
        return badRequest("Token not found")
      }

      const { success } = await this.ChecktokenRepository.checkToken(
        httpRequest.body,
      )

      return ok<ChecktokenReturn>(success)
    } catch (error) {
      return badRequest("token not found")
    }
  }
}
