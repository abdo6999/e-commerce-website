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
}