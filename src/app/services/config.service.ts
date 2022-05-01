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
  public serverUrl: string;

  constructor(@Inject(LOCALE_ID) public locale: string) { }

  get isMockData(): boolean {
    return !this.serverUrl;
  }

  setMockServer() {
    this.serverUrl = '';
  }

  setServerUrl(serverUrl: string) {
    this.serverUrl = serverUrl;
  }
}
