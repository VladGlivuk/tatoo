import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'loader-image',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class Loader implements OnInit {
  @Input() loader: string = '../../../assets/gifs/mht-loader.gif';
  @Input() image: string;
  @Input() altImage: string;
  @Input() parentClassName: string;
  @Input() ngParentClassName?: string = '';
  isLoading: boolean;

  constructor() {
    this.isLoading = true;
  }

  hideLoader() {
    this.isLoading = false;
  }

  ngOnInit(): void {}
}
