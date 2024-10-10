import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
//functions
import { getIsSamePage } from 'src/app/core/functions';
//constants
import { HOME, UK, USER_LANGUAGE } from 'src/app/core/constants';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class Header implements OnInit {
  isHome: boolean = false;
  activeLanguage: string = UK;
  isSamePage: boolean = false;

  constructor(private router: Router, private translate: TranslateService) {
    this.isSamePage = getIsSamePage(this.router.url, HOME);

    if (typeof window !== 'undefined') {
      this.activeLanguage = localStorage.getItem(USER_LANGUAGE) || UK;
      this.translate.use(this.activeLanguage);
    }
  }

  public switchLanguageClickHandler(value: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_LANGUAGE, value);
      this.activeLanguage = value;
      this.translate.use(value);
    }
  }

  public goHome() {
    if (!this.isSamePage) this.router.navigate([HOME]);
  }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isSamePage = getIsSamePage(this.router.url, HOME);

      if (window.location.pathname === HOME) this.isHome = true;
      else this.isHome = false;
    });
  }
}
