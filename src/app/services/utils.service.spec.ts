import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addDays function', () => {
    const date = new Date('2022-02-01T14:00:03');
    [
      { date, days: 1, expected: new Date('2022-02-02T00:00:00'), trunc: true  },
      { date, days: 100, expected: new Date('2022-05-12T14:00:03') },
      { date, days: -1, expected: new Date('2022-01-31T14:00:03') },
      { date, days: -100, expected: new Date('2021-10-24T00:00:00'), trunc: true},
      { date, days: 0, expected: new Date('2022-02-01T00:00:00'), trunc: true },
      { date, days: 0, expected: new Date('2022-02-01T14:00:03') }
    ].forEach((testData => {
      it(`should return correct new ${testData.trunc ? 'truncated ' : ' '}date for ${testData.days}`, () => {
        if (testData.trunc) { expect(service.addDays(testData.date, testData.days, testData.trunc)).toEqual(testData.expected); }
        else { expect(service.addDays(testData.date, testData.days)).toEqual(testData.expected); }
      });
    }));

  });
});
