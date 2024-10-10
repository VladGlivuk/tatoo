import { Component, Input, OnInit } from '@angular/core';
import { FaqItem } from 'src/app/core/types';

@Component({
  selector: 'faq-item',
  templateUrl: './faq-item.component.html',
  styleUrls: ['./faq-item.component.scss'],
})
export class FaqItemComponent implements OnInit {
  @Input() faq: FaqItem;

  constructor() {}

  ngOnInit(): void {}
}
