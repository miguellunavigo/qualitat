// import { HideTextPipe } from '@pipes/hide-text-number/hide-text-number.pipe';

// describe('HideTextPipe', () => {


//   it('create an instance', () => {
//     const pipe = new HideTextPipe();
//     expect(pipe).toBeTruthy();
//   });

//   it('should transform the card to masked type', () => {
//     const pipe = new HideTextPipe();
//     expect(pipe.transform('12345678')).toEqual('**** 5678 ');
//   });

//   it('should return empty string if card is null', () => {
//     const pipe = new HideTextPipe();
//     expect(pipe.transform(null)).toEqual('');
//   });

//   it('should return empty string if card is undefined', () => {
//     const pipe = new HideTextPipe();
//     expect(pipe.transform(undefined)).toEqual('');
//   });

//   it('should mask visibleDigits if requested inside function call', () => {
//     const pipe = new HideTextPipe();
//     expect(pipe.transform('1234567890', 5)).toEqual('***** 67890 ');
//   });

// });
