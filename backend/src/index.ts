// env
import { config } from "dotenv"

// database
import { MongoClient } from "./database/mongo"

// express
import * as express from "express"
import { Request, Response, NextFunction } from "express"
import authRouter from "./routes/auth/auth"

// cookie-parser
import * as cookieParser from "cookie-parser"

// cors
import * as cors from "cors"
import bookmarkRouter from "./routes/bookmark/bookmark"

// configures the cors to allow only one origin
const corsOptions = {
  credentials: true,
  origin: "https://entertainment-web-app-sigma.vercel.app",
}

const main = async () => {
  config()

  const app = express()

  app.use(express.json())
  app.use(cookieParser())
  app.use(cors(corsOptions))

  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header(
      "Access-Control-Allow-Origin",
      "https://entertainment-web-app-sigma.vercel.app",
    )
    res.header("Access-Control-Allow-Credentials", "true")
    next()
  })

  app.use("/auth", authRouter)
  app.use("/bookmark", bookmarkRouter)

  await MongoClient.connect()

  app.get("/", async (req: Request, res: Response) => {
    res.send("hello")
  })

  app.listen(4000, async () => {
    console.log("listening on port 4000")
  })
}

main()
