import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { TransferRecordDataI } from '../state-management/model/transfers.model';
//import { Observable, throwError } from 'rxjs';
//import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransfersService {

  constructor(protected http: HttpClient, protected cfg: ConfigService) {
    this.http = http;
  }

  public getUrl(method: 'get' | 'patch' | 'delete' | 'post', endpoint: string): string {
    let url: string;
    if (this.cfg.isMockData) {
      url = `../assets/mock/${method}/${endpoint}.json`;
    }
    else {
      url = `${this.cfg.serverUrl}/${endpoint}`;
    }
    return url;
  }

  public request(method: 'get' | 'patch' | 'delete' | 'post', endpoint: string, body?: any) {
    return this.http.request(method, this.getUrl(method, endpoint), { body });
  }

  public getAllTransfers() {
    return this.request('get', 'transfers');
  }

  public deleteTransfer(transferId: string) {
    return this.request('delete', 'transfers',{transferId});
  }

  public addTransfer(transferId: string, transfer: TransferRecordDataI) {
    return this.request('post', 'transfers',{transferId,transfer});
  }

  public updateTransfer(transferId: string, transfer: TransferRecordDataI) {
    return this.request('patch', 'transfers',{transferId,transfer});
  }
}
