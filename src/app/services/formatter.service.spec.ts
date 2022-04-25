import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';

import { FormatterService } from './formatter.service';


import { LOCALE_ID } from '@angular/core';

/* import locale de-DE
details https://stackoverflow.com/questions/66010145/missing-locale-data-for-the-locale-de-de*/
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
registerLocaleData(localeDe, 'de-DE', localeDeExtra);


describe('FormatterService with German locale', () => {
  let service: FormatterService;
  let config: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: LOCALE_ID, useValue: 'de-DE' }]
    });
    service = TestBed.inject(FormatterService);
    config = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('formatDate function', () => {
    it('should return correct date formated as ConfigService.dateFormat', () => {
      const date = new Date('2022-04-01');
      //check config first
      expect(config.dateFormat).toEqual('dd.MM.YYYY');
      expect(service.formatDate(date)).toEqual('01.04.2022');
    });
  });

  describe('formatCurrency function', () => {
    [
      { currency: 1222, expected: '1.222,00\u00A0€' },
      { currency: 1222.2, expected: '1.222,20\u00A0€' },
      { currency: 1222.21, expected: '1.222,21\u00A0€' },
      { currency: -1222.2, expected: '-1.222,20\u00A0€' },
      { currency: 0, expected: '0,00\u00A0€' },
      { currency: 9999999999.2, expected: '9.999.999.999,20\u00A0€' }
    ].forEach((testData => {
      it(`should return correct currency format for ${testData.currency}`, () => {
        expect(service.formatCurrency(testData.currency)).toEqual(testData.expected);
      });
    }));

  });

  describe('formatIBAN function', () => {
    it('should return correct IBAN format', () => {
      expect(service.formatIBAN('DE12500105170648489890')).toEqual('DE12 5001 0517 0648 4898 90');
    });
  });
});
