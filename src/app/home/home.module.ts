import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import {HomePageRoutingModule} from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
      /*RouterModule.forChild([
      {
        component: HomePage,
        children:
          [
            {
              path: 'tab-list-promos',
              children:
                [
                  {
                    path: '',
                    loadChildren: '../tab-list-promos/tab-list-promos.module#TabListPromosPageModule'
                  }
                ]
            },
            {
              path: 'tab-barcode-scanner',
              children:
                [
                  {
                    path: '',
                    loadChildren: '/tab-barcode-scanner/tab-barcode-scanner.module#TabBarcodeScannerPageModule'
                  }
                ]
            },
            {
              path: '',
              redirectTo: '/tab-list-promos',
              pathMatch: 'full'
            }
          ]
      },
      {
        path: '',
        redirectTo: '/tab-list-promos',
        pathMatch: 'full'
      }
    ])
  ],*/
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
