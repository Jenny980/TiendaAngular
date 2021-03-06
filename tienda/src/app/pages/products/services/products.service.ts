import { HttpClient } from '@angular/common/Http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiURL = 'http://localhost:3000/products';
  constructor(private Http: HttpClient) {}
  getProducts(): Observable<Product[]> {
    return this.Http.get<Product[]>(this.apiURL);
  }

  updateStock(productId: number, stock: number): Observable<any> {
    const body = { stock: stock };
    return this.Http.patch<any>(`${this.apiURL}/${productId}`, body);
  }
}
