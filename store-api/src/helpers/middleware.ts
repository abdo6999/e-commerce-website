import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as env from "dotenv";

env.config();
const { ACCESS_TOKEN_SECRET } = process.env;

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const autheHeader = req.get("authorization");
  const token = autheHeader?.split(" ")[1];
  if (token == null || token == undefined)
    return res.status(401).send("token rquiered");
  if (ACCESS_TOKEN_SECRET) {
    jwt.verify(token, ACCESS_TOKEN_SECRET, err => {
      if (err) return res.status(401).send(`${err}`);
      next();
    });
  } else {
    throw new Error("REFRESH_TOKEN_SECRET is null");
  }
};
