import { Component, OnInit } from '@angular/core';
import { SUCCESS } from 'src/app/core/constants';
//types
import { Category } from 'src/app/core/types';
//services
import { CategoryService } from 'src/app/services/Category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class Categories implements OnInit {
  allCategories: Array<Category> = [];
  hoveredCategoryId: number | null = null;
  isError: boolean = false;
  errorCode: number = 500;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categoriesResponse) => {
      if (categoriesResponse.status === SUCCESS) this.allCategories = categoriesResponse.data;
      else {
        this.isError = true;
        this.errorCode = categoriesResponse.status_code || 500;
      }
    });
  }

  ngOnDestroy(): void {
    this.isError = false;
  }
}
