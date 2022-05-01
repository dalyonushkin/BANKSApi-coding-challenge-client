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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LOCALE_ID } from '@angular/core';

/* import locale de-DE
details https://stackoverflow.com/questions/66010145/missing-locale-data-for-the-locale-de-de*/
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { UtilsService } from './services/utils.service';
import { TransfersInterceptor } from './services/interceptors/transfers.interceptor';
//import { FilterTransferPipe } from './pipes/filter-transfer.pipe';
import { EffectsModule } from '@ngrx/effects';
import { TransfersEffects } from './state-management/effects/transfers.effects';

registerLocaleData(localeDe, 'de-DE', localeDeExtra);
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot({ transfersStore: transfersReducer }),
    EffectsModule.forRoot([TransfersEffects])
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'de-DE' },
    ConfigService, FormatterService, UtilsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TransfersInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
