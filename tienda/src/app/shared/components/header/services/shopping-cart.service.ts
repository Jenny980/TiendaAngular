import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Product } from 'src/app/pages/products/interfaces/product.interface';
@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  products: Product[] = [];

  private cartSubject = new Subject<Product[]>();
  private totalSubject = new Subject<number>();
  private cantidadSubject = new Subject<number>();

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

  private addToCart(product: Product): void {
    this.products.push(product);
    this.cartSubject.next(this.products);
  }

  private cantidadProducts(): void {
    const cantidad = this.products.length;
    this.cantidadSubject.next(cantidad);
  }

  private calcTotal(): void {
    const total = this.products.reduce((acc, prod) => (acc += prod.price), 0);
    this.totalSubject.next(total);
  }
}
