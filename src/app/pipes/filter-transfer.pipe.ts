import { Pipe, PipeTransform } from '@angular/core';
import { TransferRecordsList } from '../state-management/model/transfers.model';

@Pipe({
  name: 'filterTransfer'
})
export class FilterTransferPipe implements PipeTransform {

  transform(transfers: TransferRecordsList, searchText?: string): TransferRecordsList {
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
