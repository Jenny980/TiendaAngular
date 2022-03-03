import { Component } from '@angular/core';

@Component({
  selector: 'app-thank-you-page',
  template: `<div class="container">
    <h1 class="title">Gracias!</h1>
    <p class="content">Tu orden está siendo procesada.</p>
    <span> Gracias por su compra </span>
  </div> `,
  styleUrls: ['./thank-you-page.component.scss'],
})
export class ThankYouPageComponent {}
