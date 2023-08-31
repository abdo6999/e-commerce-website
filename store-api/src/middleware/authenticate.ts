import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import  {JWT_SECRET}  from "../env";


interface AuthenticatedRequest extends Request {
  customer_id?: any; 
}

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication token is missing' });
  }
  try {
    if(JWT_SECRET){
      const decoded: any = jwt.verify(token, JWT_SECRET);
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
