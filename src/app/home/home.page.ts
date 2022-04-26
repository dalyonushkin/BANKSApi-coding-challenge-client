import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditTransferPage } from '../edit-transfer/edit-transfer.page';
import { SortModalPage } from '../sort-modal/sort-modal.page';
import { AlertController } from '@ionic/angular';
import { TransferRecordsList, TransferRecordDataI } from '../state-management/model/transfers.model';
import { Observable, pipe } from 'rxjs';
import { createSelector, select, Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { addTransfer, deleteTransfer, updateTransfer } from '../state-management/actions/home-page.actions';
import { FormatterService } from '../services/formatter.service';
import { TransfersState } from '../state-management/reducers/transfers.reducer';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  transfersList$: Observable<TransferRecordsList>;

  searchText = '';

  selectTransfers = createSelector(
    (state: TransfersState) => state.transfers,
    (transfers) => transfers
  );


  constructor(
    private store: Store<{ transfersStore: { transfers: TransferRecordsList } }>,
    public modalController: ModalController,
    public alertController: AlertController,
    private fmt: FormatterService) {
    //I have some issues with NgRX selectors typings, so, doing select with RxJS now. If i'll have free time, i'll fix it later.
    this.transfersList$ = store.pipe(select('transfersStore'), map((transfersStore) => transfersStore.transfers));
  }

  onSearchUpdate(event: CustomEvent) {
    this.searchText = event.detail.value;
    console.log(this.searchText, event);
  }

  async presentSortModal() {
    const modal = await this.modalController.create({
      component: SortModalPage
    });
    return await modal.present();
  }

  async presentEditModal(transfer?: TransferRecordDataI, id?: string) {
    const modal = await this.modalController.create({
      component: EditTransferPage,
      componentProps: {
        transfer,
        transferId: id
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.transfer) {
      if (data.transferId) {
        this.updateTransfer(data.transferId, data.transfer);
      }
      else {
        this.addTransfer(data.transfer);
      }
    }
  }

  async confirmDeleteTransfer(id: string, transfer: TransferRecordDataI) {
    const alert = await this.alertController.create({
      header: 'Delete transfer?',
      message: `Delete a transfer in the amount of ${this.fmt.formatCurrency(transfer.amount)} from ${this.fmt.formatDate(transfer.date)}?`,
      buttons: [{
        text: 'Confirm',
        handler: () => {
          this.deleteTransfer(id);
        }
      }, 'Cancel'],
    });

    await alert.present();
  }

  deleteTransfer(id: string) {
    this.store.dispatch(deleteTransfer({ id }));
  }
  addTransfer(transfer: TransferRecordDataI) {
    this.store.dispatch(addTransfer({ transfer }));
  }
  updateTransfer(id: string, transfer: TransferRecordDataI) {
    this.store.dispatch(updateTransfer({ id, transfer }));
  }

}
