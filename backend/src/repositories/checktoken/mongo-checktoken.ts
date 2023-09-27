import {
  ChecktokenParams,
  ChecktokenReturn,
  IChecktokenRepository,
} from "@/controllers/checktoken/protocols"
import { MongoClient } from "@/database/mongo"
import { MongoUser } from "../mongo-protocols"
import { ObjectId } from "mongodb"
import { Secret, verify } from "jsonwebtoken"

export class ChecktokenRepository implements IChecktokenRepository {
  async checkToken(params: ChecktokenParams): Promise<ChecktokenReturn> {
    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: new ObjectId(params.id) })

    if (!user) {
      throw new Error()
    }

    const secret = process.env.SECRET as Secret

    verify(params.token, secret)

    return {
      success: true,
    }
  }
}
