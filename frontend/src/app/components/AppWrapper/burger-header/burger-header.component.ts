import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
//animations
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'burger-header',
  templateUrl: './burger-header.component.html',
  styleUrls: ['./burger-header.component.scss'],
  animations: [
    trigger('hamburgerX', [
      state('hamburger', style({})),
      state(
        'topX',
        style({
          transform: 'rotate(45deg)',
          transformOrigin: 'left',
          margin: '6px',
        })
      ),
      state(
        'hide',
        style({
          opacity: 0,
        })
      ),
      state(
        'bottomX',
        style({
          transform: 'rotate(-45deg)',
          transformOrigin: 'left',
          margin: '6px',
        })
      ),
      transition('* => *', [animate('0.2s')]),
    ]),
  ],
})
export class BurgerHeader implements OnInit {
  isHamburger = true;

  onClick() {
    this.isHamburger = !this.isHamburger;
  }

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((_event) => {
      this.isHamburger = true;
    });
  }
}
