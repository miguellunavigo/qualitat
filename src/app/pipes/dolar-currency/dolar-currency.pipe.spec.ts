import { DolarCurrencyPipe } from './dolar-currency.pipe';
import { CurrencyPipe } from '@angular/common';
import { TestBed, inject } from '@angular/core/testing';

describe('DolarCurrencyPipe', () => {

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
    const pipe = new DolarCurrencyPipe(currency);
    expect(pipe).toBeTruthy();
  });

  it('should transform the input as peruvian currency', inject([CurrencyPipe], (currency: CurrencyPipe) => {
    const pipe = new DolarCurrencyPipe(currency);
    const number = 20;
    expect(pipe.transform(number, 0, 'USD')).toEqual('$ 20');
  }));

  it('should return empty string if value is null', inject([CurrencyPipe], (currency: CurrencyPipe) => {
    const pipe = new DolarCurrencyPipe(currency);
    expect(pipe.transform(null,0,'')).toEqual('');
  }));

  it('should return empty string if value is undefined', inject([CurrencyPipe], (currency: CurrencyPipe) => {
    const pipe = new DolarCurrencyPipe(currency);
    expect(pipe.transform(undefined,0,'')).toEqual('');
  }));

  it('should work with other type of symbol', inject([CurrencyPipe], (currency: CurrencyPipe) => {
    const pipe = new DolarCurrencyPipe(currency);
    const number = 20;
    expect(pipe.transform(number, 0, '')).toEqual('$ 20');
  }));

  it('should transform the input as peruvian currency and add 2 decimals', inject([CurrencyPipe], (currency: CurrencyPipe) => {
    const pipe = new DolarCurrencyPipe(currency);
    const number = 20;
    expect(pipe.transform(number, 2, 'USD')).toEqual('$ 20.00');
  }));

  it('should transform the input as peruvian currency and and truncate to 2 decimals', inject([CurrencyPipe], (currency: CurrencyPipe) => {
    const pipe = new DolarCurrencyPipe(currency);
    const number = 20.023;
    expect(pipe.transform(number, 2, 'USD')).toEqual('$ 20.02');
  }));
});
