import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sort-modal',
  templateUrl: './sort-modal.page.html',
  styleUrls: ['./sort-modal.page.scss'],
})
export class SortModalPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
