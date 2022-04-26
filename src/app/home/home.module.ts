import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { AngularIbanModule } from 'angular-iban';

import { HomePageRoutingModule } from './home-routing.module';
import { FilterTransferPipe } from '../pipes/filter-transfer.pipe';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    AngularIbanModule
  ],
  declarations: [HomePage,FilterTransferPipe]
})
export class HomePageModule {}
