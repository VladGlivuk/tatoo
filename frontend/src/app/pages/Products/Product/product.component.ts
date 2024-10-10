import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//constants
import { ID, SUCCESS } from 'src/app/core/constants';
//types
import { ProductType } from 'src/app/core/types';
//services
import { ProductService } from 'src/app/services/Product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class Product implements OnInit {
  product: ProductType;
  isError: boolean = false;
  errorCode: number = 500;

  constructor(private productService: ProductService, private router: ActivatedRoute, public _router: Router) {}

  ngOnInit(): void {
    const productId = this.router.snapshot.paramMap.get(ID);

    if (productId)
      this.productService.getProductById(+productId).subscribe((productsResponse) => {
        if (productsResponse.status === SUCCESS) this.product = productsResponse.data;
        else {
          this.isError = true;
          this.errorCode = productsResponse.status_code || 500;
        }
      });
  }

  ngOnDestroy(): void {
    this.isError = false;
  }
}
