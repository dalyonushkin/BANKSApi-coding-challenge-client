import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditTransferPageRoutingModule } from './edit-transfer-routing.module';

import { EditTransferPage } from './edit-transfer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditTransferPageRoutingModule
  ],
  declarations: [EditTransferPage]
})
export class EditTransferPageModule {}
