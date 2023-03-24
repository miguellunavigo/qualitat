import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundDown'
})
export class RoundDownPipe implements PipeTransform {

  transform(number: number): number {
    if (number !== null && number !== undefined) {
        return Math.floor(number);
    }
    return 0;
  }

}
