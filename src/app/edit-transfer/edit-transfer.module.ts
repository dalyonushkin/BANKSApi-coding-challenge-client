import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditTransferPageRoutingModule } from './edit-transfer-routing.module';

import { EditTransferPage } from './edit-transfer.page';
import { DaInputFormValueComponent } from '../components/da-input-form-value/da-input-form-value.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    EditTransferPageRoutingModule
  ],
  declarations: [EditTransferPage,DaInputFormValueComponent]
})
export class EditTransferPageModule {}
