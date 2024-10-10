import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//types
import { ErrorStatus } from 'src/app/core/types';
//constants
import { HOME, errorsStatus } from 'src/app/core/constants';
//helpers
import { getErrors, getFirstChapter, getSecondChapter } from 'src/app/core/helpers';

@Component({
  selector: 'error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css', './error-normalize.css'],
})
export class Error implements OnInit {
  @Input() code: number;
  errorText: string;
  errors: Array<string>;
  firstChapter: string;
  secondChapter: string;

  constructor(private router: Router) {}

  public goHome() {
    this.router.navigate([HOME]);
  }

  ngOnInit(): void {
    const codeValue = String(this.code);

    const errorsData: ErrorStatus = JSON.parse(errorsStatus);

    try {
      this.errors = getErrors(errorsData, codeValue);

      if (this.errors.length === 1) this.firstChapter = this.errors[0];
      if (this.errors.length > 1) {
        this.firstChapter = getFirstChapter(this.errors);
        this.secondChapter = getSecondChapter(this.errors);
      }
    } catch (error) {
      const newCode = 400;
      this.code = newCode;
      this.errors = getErrors(errorsData, String(newCode));

      if (this.errors.length === 1) this.firstChapter = this.errors[0];
      if (this.errors.length > 1) {
        this.firstChapter = getFirstChapter(this.errors);
        this.secondChapter = getSecondChapter(this.errors);
      }
    }
  }
}
