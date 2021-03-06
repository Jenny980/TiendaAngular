import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs/operators';
import { ShoppingCartService } from 'src/app/shared/components/header/services/shopping-cart.service';
import { Details, Order } from 'src/app/shared/interfaces/order.interface';
import { Store } from 'src/app/shared/interfaces/stores.interface';
import { DataService } from 'src/app/shared/services/data.service';
import { Product } from '../products/interfaces/product.interface';
import { ProductsService } from '../products/services/products.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  model = {
    name: '',
    store: '',
    shippingAddress: '',
    city: '',
  };
  entregarlo = true;
  cart: Product[] = [];

  stores: Store[] = [];
  constructor(
    private firestore: AngularFirestore,
    private dataSvc: DataService,
    private shoppingCartSvc: ShoppingCartService,
    private router: Router,
    private productSvc: ProductsService
  ) {
    this.carroVacio();
  }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
  }
  recogerloEntregarlo(value: boolean): void {
    this.entregarlo = value;
  }

  GuardarEnBD() {
    console.log('hola');
    this.firestore
      .collection('usuarios')
      .add({ nombre: 'Carolina', contraseña: '1234' })
      .then(() => {
        alert('Se dio de alta');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onSubmit({ value: formData }: NgForm): void {
    this.GuardarEnBD();
    console.log('Guardar', formData);
    const data: Order = {
      ...formData,
      date: this.getCurrentDay(),
      entregarlo: this.entregarlo,
    };
    this.dataSvc
      .saveOrders(data)
      .pipe(
        tap((res) => console.log('Order ->', res)),
        switchMap(({ id: orderId }) => {
          const details = this.prepareDetails();
          return this.dataSvc.saveDetailsOrder({ details, orderId });
        }),
        tap(() => this.router.navigate(['/checkout/thank-you-page'])),
        delay(3000),
        tap(() => this.shoppingCartSvc.resetCart())
      )
      .subscribe();
  }

  private getStores(): void {
    this.dataSvc
      .getStores()
      .pipe(tap((stores: Store[]) => (this.stores = stores)))
      .subscribe();
  }

  private getCurrentDay(): string {
    return new Date().toLocaleDateString();
  }

  private prepareDetails(): Details[] {
    const details: Details[] = [];
    this.cart.forEach((product: Product) => {
      const {
        id: productId,
        name: productName,
        qty: quantity,
        stock,
      } = product;
      const updateStock = stock - quantity;
      this.productSvc
        .updateStock(productId, updateStock)
        .pipe(tap(() => details.push({ productId, productName, quantity })))
        .subscribe();
    });
    return details;
  }

  private getDataCart(): void {
    this.shoppingCartSvc.cartAction$
      .pipe(tap((products: Product[]) => (this.cart = products)))
      .subscribe();
  }

  private carroVacio(): void {
    this.shoppingCartSvc.cartAction$
      .pipe(
        tap((products: Product[]) => {
          if (Array.isArray(products) && !products.length) {
            this.router.navigate(['/products']);
          }
        })
      )
      .subscribe();
  }
}
