"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = exports.Order = exports.User = exports.Product = void 0;
class Product {
    constructor(id, title, price, rating, stock, brand, description, category, thumbnail, images) {
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
exports.Product = Product;
class User {
    constructor(id, firstName, lastName, password, email, gender, username) {
        this.id = id;
        this.firstname = firstName;
        this.lastname = lastName;
        this.password = password;
        this.email = email;
        this.gender = gender;
        this.username = username;
    }
}
exports.User = User;
class Order {
    constructor(id, user_id, stutas) {
        this.id = id;
        this.user_id = user_id;
        this.stutas = stutas;
    }
}
exports.Order = Order;
class Cart {
    constructor(product_id, quantity) {
        this.product_id = product_id;
        this.quantity = quantity;
    }
}
exports.Cart = Cart;
