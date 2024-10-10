import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
//functions
import { getHandledCurrencyValue } from '../functions';
//constants
import { EN_US, NARROW, UAH, WIDE, defaultCurrencyDigitsInfo } from '../constants';

@Pipe({
  name: 'customCurrencyPipe',
})
export class CustomCurrencyPipe implements PipeTransform {
  transform(
    value: number,
    currencyCode: string = UAH,
    format: typeof WIDE | typeof NARROW = NARROW,
    digitsInfo: string = defaultCurrencyDigitsInfo,
    locale: string = EN_US
  ): string | null {
    const handledValue = getHandledCurrencyValue(value);

    return formatCurrency(handledValue, locale, getCurrencySymbol(currencyCode, format), currencyCode, digitsInfo);
  }
}
