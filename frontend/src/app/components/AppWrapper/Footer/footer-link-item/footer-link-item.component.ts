import { Component, Input, OnInit } from '@angular/core';
//types
import { LinkItem } from 'src/app/core/types';

@Component({
  selector: 'footer-link-item',
  templateUrl: './footer-link-item.component.html',
  styleUrls: ['./footer-link-item.component.scss'],
})
export class FooterLinkItemComponent implements OnInit {
  @Input() linkItem: LinkItem;

  constructor() {}

  ngOnInit(): void {}
}
