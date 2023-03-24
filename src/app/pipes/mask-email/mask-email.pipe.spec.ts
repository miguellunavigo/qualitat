import { TestBed } from '@angular/core/testing';
import { MaskEmailPipe } from './mask-email.pipe';
import { configureTestSuite } from 'ng-bullet';

describe('PeruvianCurrencyPipe', () => {

  configureTestSuite(() => {
    TestBed
      .configureTestingModule({
      });
  });

  it('create an instance', () => {
    const pipe = new MaskEmailPipe();
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('should mask an email with more than five characters', () => {
      const email = 'abcde@mail.com';
      const pipe = new MaskEmailPipe();
      const result = pipe.transform(email);
      expect(result).toEqual('abcd*@mail.com');
    });

    it('should mask an email with less than five characters', () => {
      const email = 'abcd@mail.com';
      const pipe = new MaskEmailPipe();
      const result = pipe.transform(email);
      expect(result).toEqual('a***@mail.com');
    });
  });
});
