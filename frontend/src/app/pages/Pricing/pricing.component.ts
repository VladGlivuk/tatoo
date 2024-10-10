import { Component, OnInit } from '@angular/core';
//services
import { PricingService } from 'src/app/services/Pricing/pricing.service';
//types
import { PricingItem } from 'src/app/core/types';
//constants
import { SUCCESS } from 'src/app/core/constants';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class Pricing implements OnInit {
  allPricingItems: Array<PricingItem>;
  isError: boolean = false;
  errorCode: number = 500;

  constructor(private pricingService: PricingService) {}

  ngOnInit(): void {
    this.pricingService.getPrices().subscribe((pricesResponse) => {
      if (pricesResponse.status === SUCCESS) this.allPricingItems = pricesResponse.data;
      else {
        this.isError = true;
        this.errorCode = pricesResponse.status_code || 500;
      }
    });
  }

  ngOnDestroy(): void {
    this.isError = false;
  }
}
