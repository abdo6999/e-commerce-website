import { CategoryType } from "../enums/category-type"
import { Product } from "./product"

export class Category {
  id!:number
  name!:string
  type!:CategoryType
  description!:string
  products!:Product[]
}
