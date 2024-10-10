import { Component, Input, OnInit } from '@angular/core';
//types
import { Category } from 'src/app/core/types';

@Component({
  selector: 'category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent implements OnInit {
  @Input() category: Category;
  @Input() hoveredCategoryId: number | null = null;

  loader: string = '../../../assets/gifs/mht-loader.gif';
  categoryImage: string | null;

  constructor() {}

  ngOnInit(): void {}
}
