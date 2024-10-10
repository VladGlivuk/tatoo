import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
//types
import { ProductType } from 'src/app/core/types';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: ProductType;
  @Input() hoveredProductId: number | null = null;
  currency: string = '';

  constructor(private router: Router) {}

  public goToProductPage(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  ngOnInit(): void {
  }
}
