import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'calculateTotal'
})
export class CalculateTotalPipe implements PipeTransform {

  transform(products: Product[]): number {
    if (!products || products.length === 0) {
      return 0;
    }
    const totalPrice = products.reduce((total, product) => {
      const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price;
      const quantity = typeof product.quantity === 'string' ? parseInt(product.quantity, 10) : product.quantity;

      return total + (price * quantity);
    }, 0);
    return totalPrice
  }
}
