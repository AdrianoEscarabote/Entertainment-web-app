import { MongoClient } from "@/database/mongo"
import checkToken from "@/middlewares/checktoken"
import { MongoUser } from "@/repositories/mongo-protocols"
import { clearCookies } from "@/utils/clearCookies"
import * as express from "express"
import { ObjectId } from "mongodb"

const logoutRoute = express.Router()

logoutRoute.post("/", checkToken, async (req, res) => {
  try {
    const id = req.cookies.id

    const user = await MongoClient.db.collection<MongoUser>("users").findOne({
      _id: new ObjectId(id),
    })

    if (!user) {
      return res.status(400).json({
        msg: "user is not present in the database!",
      })
    }

    clearCookies(res)

    res.status(200).send(true)
  } catch (error) {
    return res.status(500).json({
      msg: "server error!",
    })
  }
})

export default logoutRoute
