import { Injectable } from '@angular/core';
import { TransferRecordsList } from '../state-management/model/transfers.model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  addDays(date: Date, days: number, trunc: boolean = false) {
    let n = date.getTime();
    const millisecondsInOneDay=86400000;
    n = n+ millisecondsInOneDay*days;
    const targetDate = new Date(n);
    if (trunc) { targetDate.setHours(0, 0, 0, 0); }
    return targetDate;
  }

  filterTransfers(transfers: TransferRecordsList, searchText?: string): TransferRecordsList {
    let filtredTransfers = transfers;
    if (searchText) {
      const searchTextInLowerCase = searchText.toLowerCase();
      filtredTransfers = Object.keys(transfers).
        filter((transferId) => transfers[transferId]?.note?.toLowerCase().includes(searchTextInLowerCase) ||
          transfers[transferId]?.accountHolder?.toLowerCase().includes(searchTextInLowerCase)).
        reduce((acc,transferId) => { acc[transferId]=transfers[transferId]; return acc;},{});
    }
    return filtredTransfers;
  }
}
