import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
//router
import { Router } from '@angular/router';
//types
import { NewsColor, NewsImagePlacement, NewsItem } from 'src/app/core/types';
//helpers
import { getNewsColor, getNewsImagePlacement } from 'src/app/core/helpers';
//constants
import { SLASH_NEWS, defaultDateType } from 'src/app/core/constants';

@Component({
  selector: 'news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
})
export class NewsItemComponent implements OnInit {
  @Input() news: NewsItem;
  @Input() index: number;
  newsDate: string | null;
  color: NewsColor;
  imagePlacement: NewsImagePlacement;

  constructor(private router: Router, private datePipe: DatePipe) {}

  public goToNewsPage(newsId: number) {
    this.router.navigate([SLASH_NEWS, newsId]);
  }

  ngOnInit(): void {
    this.color = getNewsColor(this.index);
    this.imagePlacement = getNewsImagePlacement(this.index);
    this.newsDate = this.datePipe.transform(this.news.date, defaultDateType);
  }
}
