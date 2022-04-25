import { CurrencyPipe, DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { IbanFormatterPipe} from 'angular-iban';

/**
 * Helper sevice to format string generated in ts code.
 */

@Injectable({
  providedIn: 'root'
})
export class FormatterService {

  constructor(protected config: ConfigService) { }

  formatDate(date: Date) {
    const datePipe = new DatePipe(this.config.locale);
    return datePipe.transform(date, this.config.dateFormat);
  }

  formatCurrency(amount: number) {
    const currencyPipe = new CurrencyPipe(this.config.locale);
    return currencyPipe.transform(amount, 'EUR', 'symbol', '0.2-2');
  }

  formatIBAN(iban: string) {
    const ibanFormatterPipe= new IbanFormatterPipe();
    return ibanFormatterPipe.transform(iban);
  }
}
