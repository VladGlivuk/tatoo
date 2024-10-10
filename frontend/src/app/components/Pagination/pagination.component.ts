import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//constants
import { MERGE, PAGE } from 'src/app/core/constants';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() getNewItems: () => void;
  @Input() scrollToTop: (el: HTMLElement) => void;
  @Input() pages: Array<number> = [];
  @Input() filteredPages: Array<number> = [];
  @Input() target: HTMLElement;
  @Output() sendCurrentPage: EventEmitter<number> = new EventEmitter();
  currentPage: number = 1;

  constructor(private route: ActivatedRoute, private _router: Router) {}

  ngOnInit(): void {
    const initialCurrentPage = this.route.snapshot.queryParams[PAGE] || 1;
    if (initialCurrentPage) this.currentPage = +initialCurrentPage;

    this.sendCurrentPage.emit(this.currentPage);
  }

  public goToPage(page: number) {
    this.currentPage = page;
    this.handlePage();
  }

  public goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.handlePage();
    }
  }

  public goToNextPage() {
    const lastPage = this.pages[this.pages.length - 1];

    if (this.currentPage < lastPage) {
      this.currentPage++;
      this.handlePage();
    }
  }

  private handlePage() {
    this.sendCurrentPage.emit(this.currentPage);
    this.pushNewPage();
    this.getNewItems();
  }

  private pushNewPage() {
    this._router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: this.currentPage,
      },
      queryParamsHandling: MERGE,
    });
    this.scrollToTop(this.target);
  }
}
