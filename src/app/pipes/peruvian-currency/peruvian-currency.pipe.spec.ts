import { PeruvianCurrencyPipe } from './peruvian-currency.pipe';
import { CurrencyPipe } from '@angular/common';
import { TestBed, inject } from '@angular/core/testing';

describe('PeruvianCurrencyPipe', () => {

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        providers: [
          CurrencyPipe
        ],
      });
  });

  it('create an instance', () => {
    const currency = new CurrencyPipe('es_US');
    const pipe = new PeruvianCurrencyPipe(currency);
    expect(pipe).toBeTruthy();
  });

  it('should transform the input as peruvian currency', inject([CurrencyPipe], (currency: CurrencyPipe) => {
    const pipe = new PeruvianCurrencyPipe(currency);
    const number = 20;
    expect(pipe.transform(number, 0)).toEqual('S/ 20');
  }));

  it('should return empty string if value is null', inject([CurrencyPipe], (currency: CurrencyPipe) => {
    const pipe = new PeruvianCurrencyPipe(currency);
    expect(pipe.transform(null)).toEqual('');
  }));

  it('should return empty string if value is undefined', inject([CurrencyPipe], (currency: CurrencyPipe) => {
    const pipe = new PeruvianCurrencyPipe(currency);
    expect(pipe.transform(undefined)).toEqual('');
  }));

  it('should work with other type of symbol', inject([CurrencyPipe], (currency: CurrencyPipe) => {
    const pipe = new PeruvianCurrencyPipe(currency);
    const number = 20;
    expect(pipe.transform(number, 0)).toEqual('S/ 20');
  }));

  it('should transform the input as peruvian currency and add 2 decimals', inject([CurrencyPipe], (currency: CurrencyPipe) => {
    const pipe = new PeruvianCurrencyPipe(currency);
    const number = 20;
    expect(pipe.transform(number, 2)).toEqual('S/ 20.00');
  }));

  it('should transform the input as peruvian currency and and truncate to 2 decimals', inject([CurrencyPipe], (currency: CurrencyPipe) => {
    const pipe = new PeruvianCurrencyPipe(currency);
    const number = 20.023;
    expect(pipe.transform(number, 2)).toEqual('S/ 20.02');
  }));
});
