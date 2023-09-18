import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private firstNameSubject: BehaviorSubject<string | null>;
  private profileImageSubject: BehaviorSubject<string | null>;
  private cartSubject: BehaviorSubject<Product[]>; // Add cart subject

  constructor() {
    // Initialize the BehaviorSubjects with values from localStorage (or default values)
    const initialFirstName = localStorage.getItem('first_name') || null;
    const initialProfileImage = localStorage.getItem('profile_image') || null;
    const cartJson = localStorage.getItem('cart');
    const initialCart = cartJson ? JSON.parse(cartJson) : [];

    this.firstNameSubject = new BehaviorSubject<string | null>(initialFirstName);
    this.profileImageSubject = new BehaviorSubject<string | null>(initialProfileImage);
    this.cartSubject = new BehaviorSubject<Product[]>(initialCart);
  }

  getFirstName(): Observable<string | null> {
    return this.firstNameSubject.asObservable();
  }

  getProfileImage(): Observable<string | null> {
    return this.profileImageSubject.asObservable();
  }

  getCart(): Observable<Product[]> {
    return this.cartSubject.asObservable();
  }

  setFirstName(value: string ) {
    localStorage.setItem('first_name', value);
    this.firstNameSubject.next(value);
  }

  setProfileImage(value: string ) {
    localStorage.setItem('profile_image', value);
    this.profileImageSubject.next(value);
  }

  addToCart(product: Product) {
    const currentCart = this.cartSubject.value;
    const existingProduct = currentCart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      product.quantity = 1;
      currentCart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(currentCart));
    this.cartSubject.next(currentCart);
  }

  removeFromCart(productId: string) {
    const currentCart = this.cartSubject.value;
    const updatedCart = currentCart.filter(product => product.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    this.cartSubject.next(updatedCart);
  }


  decreaseQuantity(productId: string) {
    const currentCart = this.cartSubject.value;
    const updatedCart = currentCart.map(product => {
      if (product.id === productId && product.quantity > 1) {
        product.quantity--;
      }
      return product;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    this.cartSubject.next(updatedCart);
  }

  increaseQuantity(productId: string) {
    const currentCart = this.cartSubject.value;
    const updatedCart = currentCart.map(product => {
      if (product.id === productId) {
        product.quantity++;
      }
      return product;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    this.cartSubject.next(updatedCart);
  }
}
