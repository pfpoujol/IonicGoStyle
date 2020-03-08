import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabListPromosPageRoutingModule } from './tab-list-promos-routing.module';

import { TabListPromosPage } from './tab-list-promos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabListPromosPageRoutingModule
  ], 
  providers: [
    Clipboard
  ],
  declarations: [TabListPromosPage]
})
export class TabListPromosPageModule {}
