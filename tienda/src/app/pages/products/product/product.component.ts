import { chainedInstruction } from '@angular/compiler/src/render3/view/util';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;
  @Output() addTocartClick = new EventEmitter<Product>();
  constructor() {}

  ngOnInit(): void {}
  onClick(): void {
    this.addTocartClick.emit(this.product);
  }
}
