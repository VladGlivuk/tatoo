import { Component, Input, OnInit } from '@angular/core';
//constants
import { SUCCESS } from 'src/app/core/constants';
//types
import { ProductType, ProductDetailsFormValues } from 'src/app/core/types';
//services
import { PaymentService } from 'src/app/services/Payment/payment.service';

@Component({
  selector: 'product-details',
  templateUrl: './productDetails.component.html',
  styleUrls: ['./productDetails.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  @Input() product: ProductType;
  phoneValue: string = '+380';
  price: string;

  constructor(private paymentService: PaymentService) {}

  public submitForm({ name, phone }: ProductDetailsFormValues, isInvalid: boolean | null) {
    if (isInvalid) return;

    this.paymentService.registratePaymentTransaction(this.product.id, name, phone).subscribe((response) => {
      if (response.status === SUCCESS) {
        this.paymentService.makePaymentCheckout(response.data).subscribe((res) => {
          if (res.status === SUCCESS) {
            window.location.href = res.data;
          }
        });
      }
    });
  }

  ngOnInit(): void {}
}
