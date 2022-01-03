import { Component } from '@angular/core';
import { ShoppingCartService } from '../header/services/shopping-cart.service';

@Component({
  selector: 'app-cart',
  template: `
    <ng-container
      *ngIf="{ total: total$ | async, cantidad: cantidad$ | async } as dataCart"
    >
      {{ dataCart.total | currency }}
      ({{ dataCart.cantidad }})
    </ng-container>
  `,
})
export class CartComponent {
  cantidad$ = this.shoppingCartSvc.cantidadAction$;
  total$ = this.shoppingCartSvc.totalAction$;
  cart$ = this.shoppingCartSvc.cartAction$;
  constructor(private shoppingCartSvc: ShoppingCartService) {}
}
