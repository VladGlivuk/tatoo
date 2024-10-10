import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class Home implements OnInit {
  paymentStatus: boolean;

  imageUrls: string[] = [
    '../../../assets/images/cor1.png',
    '../../../assets/images/cor2.png',
    '../../../assets/images/cor3.png',
    '../../../assets/images/cor4.png',
  ];

  constructor() {}

  ngOnInit(): void {
    this.paymentStatus = window.location.href.includes('result=success');
  }
}
