import { OrderStatus } from "../enums/order-status"
import { Invoice } from "./invoice"
import { OrderItem } from "./order-item"
import { User } from "./user"

export class Order {
  id!:number
  order_date!:Date
  status!: OrderStatus
  shipmentDate!:Date
  comments!:string
  shippedTo!:string
  user!:User
  order_items!:OrderItem[]
  invoice!:Invoice
  invoiceId!:number
}
