import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskEmail'
})
export class MaskEmailPipe implements PipeTransform {

  constructor() { }

  transform(text: string): string {
    if (text !== null && text !== undefined && text.indexOf('@') !== -1) {
      const email = text.split('@');
      return this.censorWord(email[0]) + '@' + email[1];
    }
    return '';
  }

  private censorWord(text: string) {
    if (text.length >= 5) {
      return text.slice(0, 4) + '*'.repeat(text.length - 4) ;
    } else {
      return text[0] + '*'.repeat(text.length - 1);
    }
  }
}
