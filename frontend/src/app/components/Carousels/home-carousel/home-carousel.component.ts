import { Component, Input } from '@angular/core';
//constants
import { FADE } from 'src/app/core/constants';

@Component({
  selector: 'carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.scss'],
})
export class HomeCarouselComponent {
  @Input() imageUrls: Array<string> = [];
  @Input() transitionType: string = FADE;
  @Input() transitionDuration: number = 750;
}
