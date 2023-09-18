import jwt from 'jsonwebtoken';
import  {REFRESH_JWT_SECRET,JWT_SECRET}  from "../env";
import { Response, Response_Message } from '../interfaces/customer/return.interfaces';

interface RefreshTokenPayload {
  payload: any;
}

export function verifyRefreshToken(refreshToken: string): Response<{ access_token: string, refresh_token?: string }> | Response_Message {
  try {
    if (REFRESH_JWT_SECRET && JWT_SECRET) {
      // Decode the refreshToken first to check if it's about to expire
      const decoded = jwt.verify(refreshToken, REFRESH_JWT_SECRET) as RefreshTokenPayload;
      const isAboutToExpire = isRefreshTokenAboutToExpire(decoded);
      const payload = decoded.payload;
      let token: any = {};
      token.access_token = jwt.sign({ payload }, JWT_SECRET, { expiresIn: "15m" });

      if (isAboutToExpire) {
        // Generate a new refresh_token only if the current one is about to expire
        token.refresh_token = jwt.sign({ payload }, REFRESH_JWT_SECRET, { expiresIn: "7d" });
      }

      return { status: 200, message: "Authentication successful", data: token };
    }
    return { status: 500, message: "Internal Server Error" };
  } catch (error) {
    return { status: 401, message: `Authentication failed: ${error}` };
  }
}



function isRefreshTokenAboutToExpire(payload:any):boolean {
  const currentTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
  const expTimestamp = payload.exp; // Expiration timestamp from the payload

  if (currentTimestamp < expTimestamp) {
    const timeDifferenceInSeconds = expTimestamp - currentTimestamp;

    // Calculate the number of seconds in a day
    const secondsInADay = 86400;

    // Check if there's less than one day left until expiration
    if (timeDifferenceInSeconds < secondsInADay) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}