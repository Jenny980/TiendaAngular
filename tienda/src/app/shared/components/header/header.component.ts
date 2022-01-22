import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary">
      <a [routerLink]="['/']"><span>Mi tienda</span></a>

      <span class="spacer"></span>
      <app-cart class="mouse" (click)="irVerificar()"></app-cart>
    </mat-toolbar>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router) {}
  irVerificar(): void {
    this.router.navigate(['/checkout']);
  }
}
