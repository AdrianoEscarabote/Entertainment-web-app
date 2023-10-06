import { Response } from "express"

export function clearCookies(res: Response) {
  res.clearCookie("id")

  res.clearCookie("token")
}
