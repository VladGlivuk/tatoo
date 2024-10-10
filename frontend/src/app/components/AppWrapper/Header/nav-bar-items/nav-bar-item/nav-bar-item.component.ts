import { Component, Input, OnInit } from '@angular/core';
//types
import { LinkItem } from 'src/app/core/types';

@Component({
  selector: 'nav-bar-item',
  templateUrl: './nav-bar-item.component.html',
  styleUrls: ['./nav-bar-item.component.scss'],
})
export class NavBarItemComponent implements OnInit {
  @Input() navBarItem: LinkItem;
  @Input() isBurger: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
