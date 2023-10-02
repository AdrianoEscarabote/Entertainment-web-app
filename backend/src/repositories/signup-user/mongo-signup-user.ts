import {
  ISignupUserRepository,
  RegisterUserParams,
  RegisterUserReturn,
} from "@/controllers/signup-user/protocols"
import { MongoClient } from "@/database/mongo"
import { genSalt, hash } from "bcrypt"
import { MongoUser } from "../mongo-protocols"

export class MongoRegisterUserRepository implements ISignupUserRepository {
  async registerUser(params: RegisterUserParams): Promise<RegisterUserReturn> {
    const userExists = await MongoClient.db.collection("users").findOne({
      email: params.email,
    })

    if (userExists) {
      throw new Error("This email is already being used")
    }

    const salt = await genSalt(12)
    const passwordHash = await hash(params.password, salt)

    const userData: MongoUser = {
      email: params.email,
      password: passwordHash,
      bookmarkedShows: [],
    }

    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(userData)

    const user = await MongoClient.db.collection<MongoUser>("users").findOne({
      _id: insertedId,
    })

    if (!user) {
      throw new Error("User not created")
    }

    const { _id } = user

    return { id: _id.toHexString() }
  }
}
