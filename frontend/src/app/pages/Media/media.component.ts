import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SUCCESS } from 'src/app/core/constants';
//functions
import { getFilteredPagination, getPaginationValuesFromPage } from 'src/app/core/functions';
//types
import { MediaItemType, PaginationValues } from 'src/app/core/types';
//services
import { MediaService } from 'src/app/services/Media/media.service';
@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class Media implements OnInit {
  allMedia: Array<MediaItemType> = [];
  pages: Array<number> = [];
  filteredPages: Array<number> = [];
  currentPage: number = 1;
  isError: boolean = false;
  errorCode: number = 500;

  sendCurrentPage(data: number) {
    this.currentPage = data;
  }

  scrollToTop = (el: HTMLElement) => {
    el.scrollIntoView();
  };
  constructor(private mediaService: MediaService, private route: ActivatedRoute) {}

  getMediaItemsHelper = () => {
    const paginationValues: PaginationValues = getPaginationValuesFromPage(this.currentPage, 9);
    this.getMediaItems(paginationValues.offset, paginationValues.limit);
  };

  public getMediaItems(offset: number, limit: number): void {
    this.mediaService.getMedia(offset, limit).subscribe((mediaResponse) => {
      if (mediaResponse.status === SUCCESS) {
        this.allMedia = mediaResponse.data;

        if (mediaResponse.detail) this.pages = mediaResponse.detail.pages;
        this.filteredPages = getFilteredPagination(this.pages, this.currentPage);
      } else {
        this.isError = true;
        this.errorCode = mediaResponse.status_code || 500;
      }
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = params.page ? params.page : 1;
    });

    const paginationValues: PaginationValues = getPaginationValuesFromPage(this.currentPage, 9);

    this.mediaService.getMedia(paginationValues.offset, paginationValues.limit).subscribe((mediaResponse) => {
      if (mediaResponse.status === SUCCESS) {
        this.allMedia = mediaResponse.data;
        if (mediaResponse.detail) this.pages = mediaResponse.detail.pages;

        this.filteredPages = getFilteredPagination(this.pages, this.currentPage);
      } else {
        this.isError = true;
        this.errorCode = mediaResponse.status_code || 500;
      }
    });
  }

  ngOnDestroy(): void {
    this.isError = false;
  }
}
