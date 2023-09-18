import { CartItem } from "./cart-item";
import { Category } from "./category";
import { OrderItem } from "./order-item";

export class Product {
  id!: string;
  title!: string;
  description?: string;
  price!: number;
  discount_percentage?: number;
  rating?: number;
  stock_quantity!: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
  quantity: number = 0;
}
