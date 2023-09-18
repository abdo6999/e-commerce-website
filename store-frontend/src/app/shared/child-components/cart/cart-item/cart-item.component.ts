import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
  @Input() product!:Product
  @Output() decreaseStock = new EventEmitter<void>();
  @Output() increaseStock = new EventEmitter<void>();
  constructor(private productService:ProductService){

  }
  onDecreaseStock(event:Event) {
    event.preventDefault()
    this.decreaseStock.emit();
  }
  onIncreaseStock(event:Event) {
    event.preventDefault()
    this.increaseStock.emit();
  }
  sendProductData(product:Product) {
    this.productService.sendProductData(product)
  }
}
