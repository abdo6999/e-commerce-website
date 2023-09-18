import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import  {JWT_SECRET}  from "../env";
import { UUID } from 'crypto';


export interface AuthenticatedRequest extends Request {
  customer_id?: UUID; 
}

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const access_token = req.cookies.access_token;
  if (!access_token) {
    return res.status(401).json({ message: 'Authentication token is missing' });
  }
  try {
    if(JWT_SECRET){
      const decoded: any = jwt.verify(access_token, JWT_SECRET);
      req.customer_id =  decoded.payload.substring(0, 36);
      next();
    }else {
      return res.status(500).json({message: "Internal Server Error"});
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token has expired', expired:true });
    } else {
      return res.status(403).json({ message: 'Invalid token' });
    }
  }
}
