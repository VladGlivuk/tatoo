import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//types
import { PopUpActive, PricingItem } from 'src/app/core/types';
//constants
import { LIGHTBOX_ACTIVE, MERGE, SLASH_PRICING } from 'src/app/core/constants';

@Component({
  selector: 'app-pricing-item',
  templateUrl: './pricing-item.component.html',
  styleUrls: ['./pricing-item.component.scss'],
})
export class PricingItemComponent implements OnInit {
  @Input() pricingItem: PricingItem;
  popUpActive: PopUpActive;
  hoverClose: boolean = false;

  public openPopUp(id: number) {
    this._router.navigate([SLASH_PRICING], {
      relativeTo: this.route,
      queryParams: { id },
      queryParamsHandling: MERGE,
    });
    this.changePopUpState();
  }

  public closePopUp() {
    this._router.navigate([SLASH_PRICING], {
      relativeTo: this.route,
      queryParams: {
        id: null,
      },
      queryParamsHandling: MERGE,
    });

    this.changePopUpState();
  }

  private changePopUpState() {
    this.route.queryParams.subscribe((query) => {
      const currentId: number | null = query.id ? query.id : null;
      const isActive = this.pricingItem.id == currentId ? LIGHTBOX_ACTIVE : null;
      this.popUpActive = isActive;
    });
  }

  constructor(private _router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.changePopUpState();
  }
}
