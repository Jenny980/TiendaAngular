import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/pages/products/interfaces/product.interface';
@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  products: Product[] = [];

  private cartSubject = new BehaviorSubject<Product[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);
  private cantidadSubject = new BehaviorSubject<number>(0);

  get totalAction$(): Observable<number> {
    return this.totalSubject.asObservable();
  }
  get cantidadAction$(): Observable<number> {
    return this.cantidadSubject.asObservable();
  }
  get cartAction$(): Observable<Product[]> {
    return this.cartSubject.asObservable();
  }

  updateCart(product: Product): void {
    this.addToCart(product);
    this.cantidadProducts();
    this.calcTotal();
  }

  resetCart(): void {
    this.cartSubject.next([]);
    this.totalSubject.next(0);
    this.cantidadSubject.next(0);
    this.products = [];
  }

  private addToCart(product: Product): void {
    const isProductInCart = this.products.find(({ id }) => id == product.id);

    if (isProductInCart) {
      isProductInCart.qty += 1;
    } else {
      this.products.push({ ...product, qty: 1 });
    }

    this.cartSubject.next(this.products);
  }

  private cantidadProducts(): void {
    const cantidad = this.products.reduce((acc, prod) => (acc += prod.qty), 0);
    this.cantidadSubject.next(cantidad);
  }

  private calcTotal(): void {
    const total = this.products.reduce(
      (acc, prod) => (acc += prod.price * prod.qty),
      0
    );
    this.totalSubject.next(total);
  }
}
