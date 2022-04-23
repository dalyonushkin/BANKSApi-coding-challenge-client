import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-transfer',
  templateUrl: './edit-transfer.page.html',
  styleUrls: ['./edit-transfer.page.scss'],
})
export class EditTransferPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
