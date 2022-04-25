import { Component, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TransferRecordDataI } from '../state-management/model/transfers.model';
import { ValidatorService } from 'angular-iban';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-transfer',
  templateUrl: './edit-transfer.page.html',
  styleUrls: ['./edit-transfer.page.scss'],
})
export class EditTransferPage implements OnInit {


  @Input() transferId?: string;


  @Input() transfer?: TransferRecordDataI = {
    accountHolder: '',
    date: this.getTomorrow(),
    iban: '',
    amount: 50
  };

  public transferForm: FormGroup;

  validationMessages = {
    amount: {
      required: 'Amount is required.',
      minlength: 'Amount must be at least 2 characters long.',
      maxlength: 'Amount cannot be more than 8 characters long.',
      min: 'Amount must be greater than 50 €.',
      max: 'Amount cannot be more than 20.000.000 €.',
      pattern: 'Amount must contain only numbers and "." and "," as decimal separator, max 2 decimal places.'
    },
    iban: {
      required: 'IBAN is required.',
      iban: 'IBAN is invalid'
    },
    date: {
      required: 'Date is required.',
      futureDate: 'Date  must be in the future'
    }
  };

  constructor(public modalController: ModalController, private fb: FormBuilder) { }

  get amount() { return this.transferForm.get('amount'); }

  get iban() { return this.transferForm.get('iban'); }

  get date() { return this.transferForm.get('date'); }

  get title() {
    const currencyPipe = new CurrencyPipe('de-DE');
    const datePipe = new DatePipe('de-DE');
    const amount=currencyPipe.transform(this.transfer.amount, 'EUR', 'symbol', '0.2-2');
    const date=datePipe.transform(this.transfer.date,'dd.MM.YYYY');
    return this.transferId?`Edit transfer ${amount} from ${date}`:'Add new transfer'; }

  setDate(date: Date) {
    this.transferForm.get('date').setValue(date);
    this.transferForm.get('date').markAsTouched({ onlySelf: true });
    this.transferForm.get('date').markAsDirty({ onlySelf: true });
  };


  formatDate(date: Date): string {
    const datePipe = new DatePipe('de-DE');
    return datePipe.transform(date, 'dd.MM.YYYY');
  }

  /*
  Unable to use `isDateEnabled` property described here https://ionicframework.com/docs/api/datetime, got error:
  core.mjs:10144 NG0303: Can't bind to 'isDateEnabled' since it isn't a known property of 'ion-datetime'.

    isDateEnabled(dateIsoString) {
      const date = new Date(dateIsoString);
      let currentDate = new Date();
      currentDate=new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
      if (date < currentDate) {
        return false;
      }
      return true;
    }
    */


  futureDateValidator(checkDate: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isDateInFuture = new Date(control.value) >= checkDate;
      return isDateInFuture ? null : { futureDate: { value: control.value } };
    };
  }


  ngOnInit() {
    if (!this.transfer && !this.transferId) {
      this.transfer = {
        accountHolder: '',
        date: this.getTomorrow(),
        iban: '',
        amount: 50
      };
    }

    //const dateValidator = new FormControl(this.transfer.date, this.dateValidator());
    let currentDate = new Date();
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    currentDate.setDate(currentDate.getDate() + 1);
    //если задан id, то разрешить или предыдущее значение или больше текущей даты
    //если не задан id
    this.transferForm = this.fb.group({
      amount: new FormControl(this.transfer.amount, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(8),
        Validators.min(50),
        Validators.max(20000000),
        Validators.pattern(/^\d+[\.,]\d{1,2}$|^\d+$/)
      ]),
      iban: new FormControl(this.transfer.iban, [
        Validators.required,
        ValidatorService.validateIban
      ]),
      date: new FormControl(this.transfer.date, [
        Validators.required,
        this.futureDateValidator(this.getTomorrow())
      ]),
      accountHolder: new FormControl(this.transfer.accountHolder),
      note: new FormControl(this.transfer.note),
    });

  }

  getTomorrow() {
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    tomorrowDate.setHours(0, 0, 0, 0);
    return tomorrowDate;
  }

  save() {
    this.transferForm.markAllAsTouched();
    if (this.transferForm.valid){
      this.modalController.dismiss({
        transferId:this.transferId,
        transfer:this.transferForm.value});
    }
  }

  cancel() {
    this.modalController.dismiss();
  }
}
