import * as jwt from "jsonwebtoken";
import * as env from "dotenv";
env.config();
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const jwtToken = {
  sign(username: object): string | undefined {
    if (ACCESS_TOKEN_SECRET) {
      return jwt.sign(username, ACCESS_TOKEN_SECRET, { expiresIn: "48h" });
    } else {
      throw new Error("ACCESS_TOKEN_SECRET is null");
    }
  },
  signRefresh(username: object): string | undefined {
    if (REFRESH_TOKEN_SECRET) {
      return jwt.sign(username, REFRESH_TOKEN_SECRET, { expiresIn: "1y" });
    } else {
      throw new Error("REFRESH_TOKEN_SECRET is null");
    }
  },
  vreifyRefreshToken(refreshToken: string): string | undefined {
    let username;
    if (REFRESH_TOKEN_SECRET) {
      jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, payload: any) => {
        if (err) throw err;
        username = payload.username || undefined;
      });
    } else {
      throw new Error("REFRESH_TOKEN_SECRET is null");
    }
    return username;
  }
};
export default jwtToken;
