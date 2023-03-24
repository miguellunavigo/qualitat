import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

export const currencyCode = ['S/', '$'];

type CurrencyID = typeof currencyCode[number];

export const currencyLabels: Record<CurrencyID, string> = {
  PEN: 'S/',
  USD: '$',
}

@Pipe({
  name: 'dolarCurrency'
})
export class DolarCurrencyPipe implements PipeTransform {

  constructor(private currencyPipe: CurrencyPipe) { }

  transform(value: number, minDigits: number = 2, currencyCode: string): string {

    const sign = 'symbol';
  
    if (value !== null && value !== undefined && !isNaN(value)) {
      let output = this.currencyPipe.transform(value, currencyCode, sign, `1.${minDigits}-2`);
      output = output.replace(currencyCode, currencyLabels[currencyCode]);
      return output;
    }
    return '';
  }
}
