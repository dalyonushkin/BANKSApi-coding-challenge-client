import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditTransferPage } from '../edit-transfer/edit-transfer.page';
import { AlertController } from '@ionic/angular';
import { TransferRecordsList, TransferRecordDataI } from '../state-management/model/transfers.model';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { addTransfer, deleteTransfer, updateTransfer } from '../state-management/actions/home-page.actions';
import { FormatterService } from '../services/formatter.service';
import { UtilsService } from '../services/utils.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  transfersList$: Observable<TransferRecordsList>;
  filtredTransfersList: TransferRecordsList;
  transfersList: TransferRecordsList;
  searchResultExists = false;

  searchText:string = '';
  showSortBar = false;
  showSearchBar = false;

  constructor(
    private store: Store<{ transfersStore: { transfers: TransferRecordsList } }>,
    public modalController: ModalController,
    public alertController: AlertController,
    private fmt: FormatterService,
    private utl: UtilsService) {
    //I have some issues with NgRX selectors typings, so, doing select with RxJS now. If i'll have free time, i'll fix it later.
    this.transfersList$ = store.pipe(
      select('transfersStore'),
      map((transfersStore) => transfersStore.transfers)
    );
    this.transfersList$.subscribe((transfers) => {
      this.transfersList = transfers;
      this.updateTransfersLists();
    });
  }

  onSearchUpdate(event: CustomEvent) {
    this.searchText = event.detail.value;
    this.updateTransfersLists();
  }

  updateTransfersLists() {
    this.filtredTransfersList = this.utl.filterTransfers(this.transfersList, this.searchText);
    this.searchResultExists = Object.keys(this.filtredTransfersList).length > 0;
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

  toggleSortBar() {
    this.showSortBar = !this.showSortBar;
  }

  toggleSearchBar() {
    if (this.canToggleSearchBar()) { this.showSearchBar = !this.showSearchBar; }
  }

  canToggleSearchBar(): boolean {
    return !(this.searchText && this.showSearchBar);
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
