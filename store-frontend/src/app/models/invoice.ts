import { Order } from "./order"
import { Payment } from "./payment"
import { User } from "./user"

export class Invoice {
  id!:number
  number!:string
  invoice_date!:Date
  due_date!:Date
  payment_date!:Date
  client!:User
  payment!:Payment
  order!:Order
}
