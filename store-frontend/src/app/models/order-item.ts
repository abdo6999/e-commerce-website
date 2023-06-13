import { Order } from "./order"
import { Product } from "./product"

export class OrderItem {
  id!:number
  unit_price!:number
  quantity!:number
  total_price!:number
  product!:Product
  order!:Order
  productId!:number
  orderId!:number
}
