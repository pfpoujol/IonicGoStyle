import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomePage} from './home.page';

const routes: Routes = [
    {
        path: 'home',
        component: HomePage,
        children: [
            {
                path: 'tab-list-promos',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../tab-list-promos/tab-list-promos.module').then(m => m.TabListPromosPageModule)
                    }
                ]
            },
            {
                path: 'tab-barcode-scanner',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../tab-barcode-scanner/tab-barcode-scanner.module').then(m => m.TabBarcodeScannerPageModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/home/tab-list-promos',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/home/tab-list-promos',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomePageRoutingModule {}
// https://alligator.io/ionic/ionic-4-tabs/
