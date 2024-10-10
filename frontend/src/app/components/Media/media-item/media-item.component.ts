import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
//types
import { MediaItemType, PopUpActive } from 'src/app/core/types';
//constants
import { defaultDateType, LIGHTBOX_ACTIVE, MERGE, SLASH_MEDIA } from 'src/app/core/constants';

@Component({
  selector: 'media-item',
  templateUrl: './media-item.component.html',
  styleUrls: ['./media-item.component.scss'],
})
export class MediaItem implements OnInit {
  @Input() media: MediaItemType;
  mediaDate: string | null;
  popUpActive: PopUpActive;
  hoverClose: boolean = false;

  constructor(private _router: Router, private route: ActivatedRoute, private datePipe: DatePipe) {}

  public openPopUp(id: number) {
    this._router.navigate([SLASH_MEDIA], {
      relativeTo: this.route,
      queryParams: { id },
      queryParamsHandling: MERGE,
    });
    this.changePopUpState();
  }

  public closePopUp() {
    this._router.navigate([SLASH_MEDIA], {
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
      const isActive = this.media.id == currentId ? LIGHTBOX_ACTIVE : null;
      this.popUpActive = isActive;
    });
  }

  ngOnInit(): void {
    this.changePopUpState();
    this.mediaDate = this.datePipe.transform(this.media.date, defaultDateType);
  }
}
