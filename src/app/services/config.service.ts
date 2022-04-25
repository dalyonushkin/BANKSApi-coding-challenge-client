import { Injectable } from '@angular/core';
import { LOCALE_ID, Inject } from '@angular/core';

/**
 * Helper sevice with common config.
 */

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public dateFormat = 'dd.MM.YYYY';

  constructor( @Inject(LOCALE_ID) public locale: string) { }
}
