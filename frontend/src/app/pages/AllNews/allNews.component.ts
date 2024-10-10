import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//functions
import { getFilteredPagination, getPaginationValuesFromPage } from 'src/app/core/functions/pagination';
//services
import { NewsService } from 'src/app/services/News/news.service';
//types
import { NewsItem, PaginationValues } from 'src/app/core/types';
//constants
import { SUCCESS } from 'src/app/core/constants';

@Component({
  selector: 'app-news',
  templateUrl: './allNews.component.html',
})
export class AllNews implements OnInit {
  allNews: Array<NewsItem> = [];
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

  constructor(private newsService: NewsService, private route: ActivatedRoute) {}

  getNewsItemsHelper = () => {
    const paginationValues: PaginationValues = getPaginationValuesFromPage(this.currentPage);
    this.getNewsItems(paginationValues.offset, paginationValues.limit);
  };

  public getNewsItems(offset: number, limit: number): void {
    this.newsService.getNews(offset, limit).subscribe((newsResponse) => {
      if (newsResponse.status == SUCCESS) {
        this.allNews = newsResponse.data;
        if (newsResponse.detail) this.pages = newsResponse.detail.pages;
        this.filteredPages = getFilteredPagination(this.pages, this.currentPage);
      } else {
        this.isError = true;
        this.errorCode = newsResponse.status_code || 500;
      }
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = params.page ? params.page : 1;
    });

    const paginationValues: PaginationValues = getPaginationValuesFromPage(this.currentPage);

    this.newsService.getNews(paginationValues.offset, paginationValues.limit).subscribe((newsResponse) => {
      if (newsResponse.status == SUCCESS) {
        this.allNews = newsResponse.data;
        if (newsResponse.detail) this.pages = newsResponse.detail.pages;
        this.filteredPages = getFilteredPagination(this.pages, this.currentPage);
      } else {
        this.isError = true;
        this.errorCode = newsResponse.status_code || 500;
      }
    });
  }

  ngOnDestroy(): void {
    this.isError = false;
  }
}
