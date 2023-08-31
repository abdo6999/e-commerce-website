import jwt from 'jsonwebtoken';
import  {REFRESH_JWT_SECRET,JWT_SECRET}  from "../env";
import { Response, Response_Message } from '../interfaces/customer/customer';

interface RefreshTokenPayload {
  payload: string;
}

export function verifyRefreshToken(refreshToken: string): Response<{token:string}>|Response_Message {
  try {
    if(REFRESH_JWT_SECRET&&JWT_SECRET){
      const decoded = jwt.verify(refreshToken, REFRESH_JWT_SECRET) as RefreshTokenPayload;
      const payload = decoded.payload
      const token = {
        token: jwt.sign({ payload }, JWT_SECRET, { expiresIn: "15m" }), 
      };
      return {status:200,message:"Authentication successful",data:token};
    }
    return {status:500,message:"Internal Server Error"};
  } catch (error) {
    return {status:500,message:`Authentication failed: ${error}`};
  }
}