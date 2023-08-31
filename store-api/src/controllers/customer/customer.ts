import { UUID } from "crypto";
import { CustomerAuthCredentials } from "../../models/customer/auth.models"
import { Request, Response } from "express";
import { verifyRefreshToken } from "../../utils/verifyRefreshToken";

interface AuthenticatedRequest extends Request {
  customer_id?: any; 
}

const customer = new CustomerAuthCredentials()
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
    const {AuthCredentialsDto,CreateProfileDto} = req.body
    const signUp = await customer.signUp(AuthCredentialsDto,CreateProfileDto)
    res.status(signUp.status).json(signUp)
  }

  async signIn(req: Request, res: Response){
    const {userName,password} = req.body
    const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000; 
    const signIn = await customer.signIn(userName,password)
    if ("data" in signIn) {
      res.cookie("access_token", signIn.data.token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      });
      res.cookie("refresh_token", signIn.data.refresh_token, {
        httpOnly: true,
        maxAge: sevenDaysInMilliseconds,
      });
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
  async generateToken(req: Request, res: Response) {
    const refresh_token = req.body.refresh_token
    const token = verifyRefreshToken(refresh_token)
    res.status(token.status).json(token)
  }

  async deleteCustomer(req: AuthenticatedRequest, res: Response){
    const customer_id = req.customer_id as UUID
    const deleteUser = await customer.deleteCustomer(customer_id)
    res.status(deleteUser.status).json(deleteUser)
  }

}