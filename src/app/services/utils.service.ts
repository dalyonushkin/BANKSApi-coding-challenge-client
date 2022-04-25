import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  addDays(date: Date, days: number, trunc: boolean = false) {
    let n = date.getTime();
    const millisecondsInOneDay=86400000;
    n = n+ millisecondsInOneDay*days;
    const targetDate = new Date(n);
    if (trunc) { targetDate.setHours(0, 0, 0, 0); }
    return targetDate;
  }
}
