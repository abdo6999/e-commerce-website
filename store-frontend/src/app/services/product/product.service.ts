import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/env/environment.prod';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Response } from 'src/app/models/auth';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productDataSubject = new BehaviorSubject<Product|null>(null);

  constructor(
    private http:HttpClient
  ) { }

  getAllProducts():Observable<Product[]> {
    return this.http.get<Response<Product[]>>(environment.PRODUCTS_ROUTE)
    .pipe(
      map(response => response.data)
    );
  }

  getAllProductsWithCategory(): Observable<{ [category: string]: Product[] }> {
    return this.getAllProducts().pipe(
      map((products:Product[]) => {
        // Create an object to store products by category
        const productsByCategory: { [category: string]: Product[] } = {};

        // Group products by category
        products.forEach((product:any) => {
          if (!productsByCategory[product.category]) {
            productsByCategory[product.category] = [];
          }
          productsByCategory[product.category].push(product);
        });

        return productsByCategory;
      })
    );
  }

  sendProductData(data: Product) {
    this.productDataSubject.next(data);
  }

  getProductData(): Observable<Product | null> {
    return this.productDataSubject.asObservable();
  }
}
