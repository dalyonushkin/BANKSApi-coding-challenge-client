import { TransferRecordsList } from '../state-management/model/transfers.model';
import { FilterTransferPipe } from './filter-transfer.pipe';

describe('FilterTransferPipe', () => {
  const transfers: TransferRecordsList = {
    '10a': {
      date: new Date('2022-04-04'),
      amount: 123.33,
      accountHolder: 'John Doe',
      iban: 'DE12500105170648489890',
      note: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
scrambled it to make a type specimen book. It has survived not only five centuries, but also theleap
into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
software like Aldus PageMaker including versions of Lorem Ipsum.`
    },
    '11b': {
      date: new Date('2022-04-01'),
      amount: 99999999.33,
      accountHolder: 'Jane Doe',
      iban: 'DE12500105170648489890',
      note: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
scrambled it to make a type specimen book. It has survived not only five centuries, but also theleap
into electronic typesetting, remaining essentially unchanged. `},
    '13b': {
      date: new Date('2022-04-10'),
      amount: 9999999999999.333333,
      accountHolder: 'Baby Doe',
      iban: 'DE12500105170648489890'
    },
    '14a': {
      date: new Date('2022-04-10'),
      amount: 9999999999999.333333,
      accountHolder: 'James Doe',
      iban: 'DE12500105170648489890'
    },
    '16b': {
      date: new Date('2022-04-10'),
      amount: 9999999999999.333333,
      accountHolder: 'Judy Doe',
      iban: 'DE12500105170648489890'
    }
  };

  it('create an instance', () => {
    const pipe = new FilterTransferPipe();
    expect(pipe).toBeTruthy();
  });
  it('should return same object with "searchText" is empty', () => {
    const pipe = new FilterTransferPipe();
    expect(pipe.transform(transfers)).toEqual(transfers);
  });
  it('should return filtred object with "searchText" found at "note" field', () => {
    const pipe = new FilterTransferPipe();
    const searchResult=pipe.transform(transfers, 'Aldus PageMaker');
    expect(searchResult).toEqual({
      '10a': {
        date: new Date('2022-04-04'),
        amount: 123.33,
        accountHolder: 'John Doe',
        iban: 'DE12500105170648489890',
        note: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
scrambled it to make a type specimen book. It has survived not only five centuries, but also theleap
into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
software like Aldus PageMaker including versions of Lorem Ipsum.`
      }
    });
    expect(Object.keys(searchResult).length).toEqual(1);
  });
  it('should return filtred object with "searchText" found at "accountHolder" field', () => {
    const pipe = new FilterTransferPipe();
    const searchResult=pipe.transform(transfers, 'Ja');
    expect(searchResult).toEqual({
      '11b': {
        date: new Date('2022-04-01'),
        amount: 99999999.33,
        accountHolder: 'Jane Doe',
        iban: 'DE12500105170648489890',
        note: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
scrambled it to make a type specimen book. It has survived not only five centuries, but also theleap
into electronic typesetting, remaining essentially unchanged. `},
  '14a': {
    date: new Date('2022-04-10'),
    amount: 9999999999999.333333,
    accountHolder: 'James Doe',
    iban: 'DE12500105170648489890'
  }
    });
    expect(Object.keys(searchResult).length).toEqual(2);
  });
});
