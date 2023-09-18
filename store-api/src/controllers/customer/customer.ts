import { UUID } from "crypto";
import { CustomersModel } from "../../models/customer/customer.models"
import { Request, Response } from "express";
import { verifyRefreshToken } from "../../utils/verifyRefreshToken";
import jwt from 'jsonwebtoken';
import  {JWT_SECRET}  from "../../env";
interface AuthenticatedRequest extends Request {
  customer_id?: any; 
}

const customer = new CustomersModel()
export default class CustomerController {
  async getAllCustomers(_req: Request, res: Response){
    const allUsers = await customer.getAllCustomers()
    if("data" in allUsers){
      res.status(200).json(allUsers)
    }else {
      res.status(allUsers.status).json(allUsers)
    }
  }

  async signUp(req: Request, res: Response){
    const {authCredentialsDot,createProfileDot} = req.body
    const signUp = await customer.signUp(authCredentialsDot,createProfileDot)
    res.status(signUp.status).json(signUp)
  }

  async signIn(req: Request, res: Response){
    const {username,password} = req.body.authCredentialsDot
    const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000; 
    const signIn = await customer.signIn(username,password)
    if ("data" in signIn) {
      res.cookie("access_token", signIn.data.access_token, {
        httpOnly: true,
        maxAge: 1000*60*15,
        path: '/', 
        sameSite: 'strict',
      });
      res.cookie("refresh_token", signIn.data.refresh_token, {
        httpOnly: true,
        maxAge: sevenDaysInMilliseconds,
        path: '/', 
        sameSite: 'strict',
      });
      res.status(200).json({status: 200,message: "Authentication successful",data:signIn.data.profile});
    }else {
      res.status(signIn.status).json(signIn);
    }
  }

  async getAuthenticatedCustomer(req: AuthenticatedRequest, res: Response){
    const customer_id = req.customer_id as UUID
    const AuthenticatedUser = await customer.getAuthenticatedCustomer(customer_id)
    if("data" in AuthenticatedUser){
      res.status(200).json(AuthenticatedUser)
    }else {
      res.status(AuthenticatedUser.status).json(AuthenticatedUser)
    }
  }

  async customerNameExists(req: Request, res: Response){
    const {username} = req.params
    const isExist = await customer.customerNameExists(username)
    if("data" in isExist){
      res.status(200).json(isExist)
    }else {
      res.status(isExist.status).json(isExist)
    }
  }
  
  async verifyToken(req: Request, res: Response) {
    const access_token = req.cookies.access_token;
    const refresh_token = req.cookies.refresh_token;
    if(!access_token){
      return res.json({ authenticated: false });
    }
    if(JWT_SECRET){
      jwt.verify(access_token, JWT_SECRET,(err: any, decoded: any) => {
        if (err) {
          if(!refresh_token){
            return res.json({ authenticated: false,token:true });
          }
          return res.json({ authenticated: false });
        }
        res.json({ authenticated: true });
      });
    }else {
      return res.status(500).json({message: "Internal Server Error"});
    }
  }
  
  async generateAccessToken(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token
    const token = verifyRefreshToken(refresh_token)
    const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000; 
    if ("data" in token) {
      res.cookie("access_token", token.data.access_token, {
        httpOnly: true,
        maxAge: 1000*60*15,
        path: '/', 
        sameSite: 'strict',
      });
      if(token.data.refresh_token){
        res.cookie("refresh_token", token.data.refresh_token, {
          httpOnly: true,
          maxAge: sevenDaysInMilliseconds,
          path: '/', 
          sameSite: 'strict',
        });
      }
    }
    res.status(token.status).json(token);
  }

  async logout(req: Request, res: Response) {
    res.cookie('access_token', '', { expires: new Date(0), httpOnly: true });
    res.cookie('refresh_token', '', { expires: new Date(0), httpOnly: true });
    res.status(200).json({message:'Cookie deleted'});
  }
  
  async deleteCustomer(req: AuthenticatedRequest, res: Response){
    const customer_id = req.customer_id as UUID
    const deleteUser = await customer.deleteCustomer(customer_id)
    res.status(deleteUser.status).json(deleteUser)
  }

}