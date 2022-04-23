import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SortModalPage } from './sort-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SortModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SortModalPageRoutingModule {}
