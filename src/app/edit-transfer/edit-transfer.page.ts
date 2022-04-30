import { Component, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TransferRecordDataI } from '../state-management/model/transfers.model';
import { ValidatorService } from 'angular-iban';
import { FormatterService } from '../services/formatter.service';
import { UtilsService } from '../services/utils.service';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-edit-transfer',
  templateUrl: './edit-transfer.page.html',
  styleUrls: ['./edit-transfer.page.scss'],
})
export class EditTransferPage implements OnInit {


  @Input() transferId?: string;


  @Input() transfer?: TransferRecordDataI;
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

  constructor(
    public modalController: ModalController,
    private fb: FormBuilder,
    private fmt: FormatterService,
    private utl: UtilsService,
    private cfg: ConfigService) { }

  get amount() { return this.transferForm.get('amount'); }

  get iban() { return this.transferForm.get('iban'); }

  get date() { return this.transferForm.get('date'); }

  get title() {
    return this.transferId ?
      `Edit transfer ${this.fmt.formatCurrency(this.transfer.amount)} from ${this.fmt.formatDate(this.transfer.date)}` :
      'Add new transfer';
  }

  setDate(date: Date) {
    this.transferForm.get('date').setValue(date);
    this.transferForm.get('date').markAsTouched({ onlySelf: true });
    this.transferForm.get('date').markAsDirty({ onlySelf: true });
  };

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
        date: this.utl.addDays(new Date(), 1, true),
        iban: '',
        amount: 50
      };
    }

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
        this.futureDateValidator(this.utl.addDays(new Date(), 1, true))
      ]),
      accountHolder: new FormControl(this.transfer.accountHolder),
      note: new FormControl(this.transfer.note),
    });

  }

  save() {
    this.transferForm.markAllAsTouched();
    if (this.transferForm.valid) {
      this.modalController.dismiss({
        transferId: this.transferId,
        transfer: this.transferForm.value
      });
    }
  }

  cancel() {
    this.modalController.dismiss();
  }
}
