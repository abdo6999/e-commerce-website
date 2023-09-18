import { Component, Input , ChangeDetectionStrategy} from '@angular/core';
import { Product } from 'src/app/models/product';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class ProductCardComponent {
  @Input() product!:Product
  max = 5;
  isReadonly = true;
  constructor(private storage:LocalStorageService){

  }
  addToCart(product:Product){
    this.storage.addToCart(product)
  }
}
