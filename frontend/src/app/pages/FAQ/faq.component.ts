import { Component, OnInit } from '@angular/core';
import { SUCCESS } from 'src/app/core/constants';
//functions
import { getFilteredPagination, getPaginationValuesFromPage } from 'src/app/core/functions';
//types
import { FaqItem, PaginationValues } from 'src/app/core/types';
//services
import { FaqService } from './../../services/FAQ/faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class Faq implements OnInit {
  allFaqs: Array<FaqItem> = [];
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

  getFaqsItemsHelper = () => {
    const paginationValues: PaginationValues = getPaginationValuesFromPage(this.currentPage, 10);
    this.getFaqsItems(paginationValues.offset, paginationValues.limit);
  };

  constructor(private faqService: FaqService) {}

  public getFaqsItems(offset: number, limit: number): void {
    this.faqService.getFAQs(offset, limit).subscribe((faqResponse) => {
      if (faqResponse.status === SUCCESS) {
        this.allFaqs = faqResponse.data;
        if (faqResponse.detail) this.pages = faqResponse.detail.pages;
        this.filteredPages = getFilteredPagination(this.pages, this.currentPage);
      } else {
        this.isError = true;
        this.errorCode = faqResponse.status_code || 500;
      }
    });
  }

  ngOnInit(): void {
    const paginationValues: PaginationValues = getPaginationValuesFromPage(this.currentPage, 10);

    this.faqService.getFAQs(paginationValues.offset, paginationValues.limit).subscribe((faqResponse) => {
      if (faqResponse.status === SUCCESS) {
        this.allFaqs = faqResponse.data;
        if (faqResponse.detail) this.pages = faqResponse.detail.pages;
        this.filteredPages = getFilteredPagination(this.pages, this.currentPage);
      } else {
        this.isError = true;
        this.errorCode = faqResponse.status_code || 500;
      }
    });
  }

  ngOnDestroy(): void {
    this.isError = false;
  }
}
