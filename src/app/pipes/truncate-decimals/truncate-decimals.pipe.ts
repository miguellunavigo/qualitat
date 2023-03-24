import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateDecimals'
})
export class TruncateDecimalsPipe implements PipeTransform {

  constructor() { }

  transform(number: number, maxDecimals: number = 2): string {
    if (number !== null && number !== undefined) {
        // const maskedSection = text.slice(0, -visibleDigits);
        // const visibleSection = text.slice(-visibleDigits);
        // const maskedNumber =  maskedSection.replace(/./g, '*') + visibleSection;
        return number.toFixed(maxDecimals);
    }
    return '';
  }
}
