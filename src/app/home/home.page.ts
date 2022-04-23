import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SortModalPage } from '../sort-modal/sort-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  mockData = [
    {
      date: new Date(),
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
    {
      date: new Date('2022-04-01'),
      amount: 99999999.33,
      accountHolder: 'Jane Doe',
      iban: 'DE12500105170648489890',
      note: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
scrambled it to make a type specimen book. It has survived not only five centuries, but also theleap
into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
software like Aldus PageMaker including versions of Lorem Ipsum.`},
    {
      date: new Date('2022-04-10'),
      amount: 9999999999999.333333,
      accountHolder: 'Baby Doe',
      iban: 'DE12500105170648489890'
    },
    {
      date: new Date('2022-04-10'),
      amount: 9999999999999.333333,
      accountHolder: 'James Doe',
      iban: 'DE12500105170648489890'
    },
    {
      date: new Date('2022-04-10'),
      amount: 9999999999999.333333,
      accountHolder: 'Judy Doe',
      iban: 'DE12500105170648489890'
    }
  ];
  constructor(public modalController: ModalController) { }

  async presentFilterSorterModal() {
    const modal = await this.modalController.create({
      component: SortModalPage
    });
    return await modal.present();
  }

}
