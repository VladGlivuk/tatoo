import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
//services
import { NewsService } from 'src/app/services/News/news.service';
//types
import { NewsItem } from 'src/app/core/types';
//constants
import { BLUR, defaultDateType, ID, SUCCESS } from 'src/app/core/constants';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class News implements OnInit {
  transitionType: string = BLUR;
  news: NewsItem;
  newsDate: string | null;
  isError: boolean = false;
  errorCode: number = 500;

  constructor(private newsService: NewsService, private route: ActivatedRoute, private datePipe: DatePipe) {}

  ngOnInit(): void {
    const newsId = this.route.snapshot.paramMap.get(ID);
    if (newsId) {
      this.newsService.getNewsById(+newsId).subscribe((newsResponse) => {
        if (newsResponse.status === SUCCESS) {
          this.news = newsResponse.data;
        } else {
          this.isError = true;
          this.errorCode = newsResponse.status_code || 500;
        }
      });
    }

    this.newsDate = this.datePipe.transform(this.news?.date, defaultDateType);
  }

  ngOnDestroy(): void {
    this.isError = false;
  }
}
