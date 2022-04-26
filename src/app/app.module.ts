import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { transfersReducer } from './state-management/reducers/transfers.reducer';
import { ConfigService } from './services/config.service';
import { FormatterService } from './services/formatter.service';


import { LOCALE_ID } from '@angular/core';

/* import locale de-DE
details https://stackoverflow.com/questions/66010145/missing-locale-data-for-the-locale-de-de*/
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { UtilsService } from './services/utils.service';
//import { FilterTransferPipe } from './pipes/filter-transfer.pipe';

registerLocaleData(localeDe, 'de-DE', localeDeExtra);
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot({ transfersStore: transfersReducer })
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'de-DE' },
    ConfigService, FormatterService, UtilsService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
