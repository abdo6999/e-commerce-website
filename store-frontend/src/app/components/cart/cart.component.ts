import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  products$ = this.storage.getCart()
  constructor(private storage: LocalStorageService){}
  ngOnInit(): void {
  }

  decreaseStock(product: Product) {
    const quantity = typeof product.quantity === 'string' ? parseInt(product.quantity, 10) : product.quantity;
    if (quantity) {
      this.storage.decreaseQuantity(product.id)
    }
    if(quantity === 1) {
      this.storage.removeFromCart(product.id)
    }
  }

  increaseStock(product: Product) {
    const quantity = typeof product.quantity === 'string' ? parseInt(product.quantity, 10) : product.quantity;
    const stockQuantity = typeof product.stock_quantity === 'string' ? parseInt(product.stock_quantity, 10) : product.stock_quantity;
    if (quantity < stockQuantity) {
      this.storage.increaseQuantity(product.id)
    }
  }
}
