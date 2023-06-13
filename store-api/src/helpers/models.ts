class Product {
  id?: number;
  title!: string;
  price!: number;
  rating!: number;
  stock!: number;
  brand!: string;
  description!: string;
  category!: string;
  thumbnail!: string;
  images!: string[];
  constructor(
    id: number,
    title: string,
    price: number,
    rating: number,
    stock: number,
    brand: string,
    description: string,
    category: string,
    thumbnail: string,
    images: string[]
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.rating = rating;
    this.stock = stock;
    this.brand = brand;
    this.description = description;
    this.category = category;
    this.thumbnail = thumbnail;
    this.images = images;
  }
}

class User {
  id?: number;
  firstname!: string;
  lastname!: string;
  password!: string;
  email!: string;
  gender!: string;
  username!: string;
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    gender: string,
    username: string
  ) {
    this.id = id;
    this.firstname = firstName;
    this.lastname = lastName;
    this.password = password;
    this.email = email;
    this.gender = gender;
    this.username = username;
  }
}

class Order {
  id?: number;
  user_id!: number;
  stutas!: boolean;
  constructor(id: number, user_id: number, stutas: boolean) {
    this.id = id;
    this.user_id = user_id;
    this.stutas = stutas;
  }
}
class Cart {
  product_id!: number;
  quantity!: number;
  order_id!: number;
  constructor(product_id: number, quantity: number) {
    this.product_id = product_id;
    this.quantity = quantity;
  }
}
export { Product, User, Order, Cart };
