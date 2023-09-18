import { Invoice } from "./invoice";
import { Order } from "./order";
import { Payment } from "./payment";
import { Profile } from "./profile";

export class User {
  id!:number;
  username!:string
  password!:string
  isAdmin!:boolean
  profile!:Profile
  orders!:Order[]
  invoices!:Invoice[]
  payments!:Payment[]
}

