// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'hideText'
// })
// export class HideTextPipe implements PipeTransform {

//   constructor() { }

//   transform(text: string, visibleDigits: number = 4): string {
//     if (text !== null && text !== undefined) {
//         const maskedSection = text.slice(0, -visibleDigits);
//         const visibleSection = text.slice(-visibleDigits);
//         const maskedNumber =  maskedSection.replace(/./g, '*') + visibleSection;
//         let result: string = this.maskedNumberWithPattern(visibleDigits, maskedNumber);
//         return result.trimRight();
//     }
//     return '';
//   }

//   private maskedNumberWithPattern(visibleDigits:any, maskedNumber:any) {
//     const pattern = `(.{${visibleDigits}})`;
//     const re = new RegExp(pattern, 'g');
//     return maskedNumber.replace(re, '$1 ');
//   }

// }
