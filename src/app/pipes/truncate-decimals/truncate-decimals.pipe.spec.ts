import { TruncateDecimalsPipe } from './truncate-decimals.pipe';
import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

describe('PeruvianCurrencyPipe', () => {

  configureTestSuite(() => {
    TestBed
      .configureTestingModule({
      });
  });

  it('create an instance', () => {
    const pipe = new TruncateDecimalsPipe();
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('should truncate to 2 decimals if default', () => {
      const number = 0.1234;
      const pipe = new TruncateDecimalsPipe();
      const result = pipe.transform(number);
      expect(result).toEqual('0.12');
    });

    it('should truncate to N decimals if second argument is given', () => {
      const number = 0.1234;
      const pipe = new TruncateDecimalsPipe();
      const result = pipe.transform(number, 3);
      expect(result).toEqual('0.123');
    });

    it('should return empty if there is not number', () => {
      const pipe = new TruncateDecimalsPipe();
      const result = pipe.transform(null);
      expect(result).toEqual('');
    });
  });
});
