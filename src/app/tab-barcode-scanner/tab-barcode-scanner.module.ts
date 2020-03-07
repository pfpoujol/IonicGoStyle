import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabBarcodeScannerPageRoutingModule } from './tab-barcode-scanner-routing.module';

import { TabBarcodeScannerPage } from './tab-barcode-scanner.page';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabBarcodeScannerPageRoutingModule
  ],
  declarations: [TabBarcodeScannerPage],
  providers: [BarcodeScanner]
})
export class TabBarcodeScannerPageModule {}
