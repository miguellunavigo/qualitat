import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'peruvianCurrency'
})
export class PeruvianCurrencyPipe implements PipeTransform {

  constructor(private currencyPipe: CurrencyPipe) { }

  transform(value: number, minDigits: number = 2): string {
    const sign = 'symbol';
    if (value !== null && value !== undefined && !isNaN(value)) {
      let output = this.currencyPipe.transform(value, 'PEN', sign, `1.${minDigits}-2`);
      output = output.replace(/\PEN/g, 'S/ ');
      return output;
    }
    return '';
  }
}
