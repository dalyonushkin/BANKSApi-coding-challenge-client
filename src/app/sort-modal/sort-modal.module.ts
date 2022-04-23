import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SortModalPageRoutingModule } from './sort-modal-routing.module';

import { SortModalPage } from './sort-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SortModalPageRoutingModule
  ],
  declarations: [SortModalPage]
})
export class SortModalPageModule {}
