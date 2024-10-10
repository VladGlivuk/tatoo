import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'error=page',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorPage implements OnInit {
  @Input() errorCode: number;

  constructor() { }

  ngOnInit(): void {
  }

}
