import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditTransferPage } from '../edit-transfer/edit-transfer.page';
import { SortModalPage } from '../sort-modal/sort-modal.page';
import { AlertController } from '@ionic/angular';
import { TransferRecordsList, TransferRecordDataI } from '../state-management/model/transfers.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { addTransfer, deleteTransfer, updateTransfer } from '../state-management/actions/home-page.actions';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  transfersList$: Observable<TransferRecordsList>;

  constructor(
    private store: Store<{ transfersStore: { transfers: TransferRecordsList } }>,
    public modalController: ModalController,
    public alertController: AlertController) {
    this.transfersList$ = store.select('transfersStore').pipe(map((transfersStore) => transfersStore.transfers));
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
      if (data.transferId) { this.updateRecord(data.transferId, data.transfer); }
      else { this.addRecord(data.transfer); }
    }
  }

  async delete(id: string, transfer: TransferRecordDataI) {
    const currencyPipe = new CurrencyPipe('de-DE');
    const datePipe = new DatePipe('de-DE');
    const amount = currencyPipe.transform(transfer.amount, 'EUR', 'symbol', '0.2-2');
    const date = datePipe.transform(transfer.date, 'dd.MM.YYYY');
    const alert = await this.alertController.create({
      header: 'Delete transfer?',
      message: `Delete a transfer in the amount of ${amount} from ${date}?`,
      buttons: [{
        text: 'Confirm',
        handler: () => {
          this.deleteRec(id);
        }
      }, 'Cancel'],
    });

    await alert.present();
  }

  deleteRec(id: string) {
    this.store.dispatch(deleteTransfer({ id }));
  }
  addRecord(transfer: TransferRecordDataI){
    this.store.dispatch(addTransfer({ transfer }));
  }
  updateRecord(id: string, transfer: TransferRecordDataI){
    this.store.dispatch(updateTransfer({ id,transfer }));
  }

}
