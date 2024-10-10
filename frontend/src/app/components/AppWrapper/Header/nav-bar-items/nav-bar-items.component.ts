import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
//types
import { LinkItem } from 'src/app/core/types';

@Component({
  selector: 'nav-bar-items',
  templateUrl: './nav-bar-items.component.html',
  styleUrls: ['./nav-bar-items.component.scss'],
})
export class NavBarItemsComponent implements OnInit {
  @Input() isBurger: boolean = false;
  navBarItems: Array<LinkItem> = [];

  constructor(private translate: TranslateService) {
    if (typeof window !== 'undefined') this.translate.get('navBar').subscribe((navBarData) => (this.navBarItems = navBarData));
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined')
      this.translate.onLangChange.subscribe((_value) => {
        this.translate.get('navBar').subscribe((navBarData: Array<LinkItem>) => (this.navBarItems = navBarData));
      });
  }
}
