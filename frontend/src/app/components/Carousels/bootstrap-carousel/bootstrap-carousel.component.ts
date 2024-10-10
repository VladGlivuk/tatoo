import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bootstrap-carousel',
  templateUrl: './bootstrap-carousel.component.html',
  styleUrls: ['./bootstrap-carousel.component.scss'],
})
export class BootstrapCarouselComponent implements OnInit {
  @Input() images: Array<string> = [];

  constructor() {}

  ngOnInit(): void {}
}
