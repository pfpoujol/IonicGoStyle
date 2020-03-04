import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabBarcodeScannerPage } from './tab-barcode-scanner.page';

const routes: Routes = [
  {
    path: '',
    component: TabBarcodeScannerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabBarcodeScannerPageRoutingModule {}
