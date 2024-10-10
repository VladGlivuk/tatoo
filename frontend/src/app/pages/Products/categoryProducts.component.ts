import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
//types
import { PaginationValues, ProductType } from 'src/app/core/types';
//services
import { ProductService } from 'src/app/services/Product/product.service';
//functions
import { getFilteredPagination, getPaginationValuesFromPage } from 'src/app/core/functions';
//constants
import { ID, SUCCESS } from 'src/app/core/constants';

@Component({
  selector: 'category-products',
  templateUrl: './categoryProducts.component.html',
  styleUrls: ['./categoryProducts.component.scss'],
})
export class CategoryProducts implements OnInit {
  products: Array<ProductType>;
  pages: Array<number> = [];
  filteredPages: Array<number> = [];
  currentPage: number = 1;
  hoveredProductId: number | null = null;
  isError: boolean = false;
  errorCode: number = 500;

  sendCurrentPage(data: number) {
    this.currentPage = data;
  }

  scrollToTop = (el: HTMLElement) => {
    el.scrollIntoView();
  };

  constructor(private productService: ProductService, private router: ActivatedRoute, private _router: Router) {}

  getCategoryProductsHelper = () => {
    const paginationValues: PaginationValues = getPaginationValuesFromPage(this.currentPage);
    this.getCategoryProductsItems(paginationValues.offset, paginationValues.limit);
  };

  public getCategoryProductsItems(offset: number, limit: number): void {
    const categoryId = this.router.snapshot.paramMap.get(ID);

    if (categoryId) {
      this.productService.getProductsByCategoryId(+categoryId, offset, limit).subscribe((products) => {
        this.products = products.data;
        if (products.detail) this.pages = products.detail.pages;
        this.filteredPages = getFilteredPagination(this.pages, this.currentPage);
      });
    }
  }

  ngOnInit(): void {
    this.router.queryParams.subscribe((params) => {
      this.currentPage = params.page ? params.page : 1;
    });

    const paginationValues: PaginationValues = getPaginationValuesFromPage(this.currentPage);

    const categoryId = this.router.snapshot.paramMap.get(ID);

    if (categoryId)
      this.productService.getProductsByCategoryId(+categoryId, paginationValues.offset, paginationValues.limit).subscribe((productsResponse) => {
        if (productsResponse.status === SUCCESS) {
          this.products = productsResponse.data;

          if (productsResponse.detail) this.pages = productsResponse.detail.pages;
          this.filteredPages = getFilteredPagination(this.pages, this.currentPage);
        } else {
          this.isError = true;
          this.errorCode = productsResponse.status_code || 500;
        }
      });
  }

  ngOnDestroy(): void {
    this.isError = false;
  }
}
