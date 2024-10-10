import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'payment-notification',
  templateUrl: './payment-notification.component.html',
  styleUrls: ['./payment-notification.component.scss'],
})
export class PaymentNotificationComponent implements OnInit {
  @Input() isActive: boolean = false;

  public closeNotification() {
    this.isActive = false;
  }

  constructor() {}

  ngOnInit(): void {}
}
