import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, fromEvent } from 'rxjs';
//types
import { LinkItem } from 'src/app/core/types';
//services
import { HomeService } from 'src/app/services/Home/home.service';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class Footer implements OnInit {
  @ViewChild('submitButton', { read: ElementRef, static: true }) button: ElementRef;
  currentYear = new Date().getUTCFullYear();
  credentialsValue: string;
  footerLinks: Array<LinkItem> = [];

  constructor(private homeService: HomeService, private translate: TranslateService) {
    if (typeof window !== 'undefined') this.translate.get('footer.links').subscribe((navBarData) => (this.footerLinks = navBarData));
  }

  public submit(isInvalid: boolean | null) {
    if (isInvalid) return;

    this.homeService.sendFeedback(this.credentialsValue).subscribe((credentials) => {
      console.log(credentials.status);
    });
  }

  ngOnInit(): void {
    //TODO make debounce correct
    fromEvent(this.button.nativeElement, 'click')
      .pipe(debounceTime(1000))
      .subscribe((_event) => {
        console.log('submit');
      });

    if (typeof window !== 'undefined')
      this.translate.onLangChange.subscribe((_value) => {
        this.translate.get('footer.links').subscribe((navBarData: Array<LinkItem>) => (this.footerLinks = navBarData));
      });
  }
}
