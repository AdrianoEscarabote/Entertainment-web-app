import {
  ILoginUserRepository,
  LoginUserParams,
  LoginUserReturn,
} from "@/controllers/login-user/protocols"
import { MongoClient } from "@/database/mongo"
import { compare } from "bcrypt"

export class MongoLoginUserRepository implements ILoginUserRepository {
  async loginUser(params: LoginUserParams): Promise<LoginUserReturn> {
    const user = await MongoClient.db
      .collection("users")
      .findOne({ email: params.email })

    if (user === null) {
      throw new Error()
    }

    // check if password match
    const checkPassword = await compare(
      params.password as string,
      user.password as string,
    )

    if (!checkPassword) {
      throw new Error("Invalid password!")
    }

    const { _id } = user

    return { id: _id.toHexString(), success: true }
  }
}
