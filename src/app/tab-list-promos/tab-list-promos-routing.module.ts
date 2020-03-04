import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabListPromosPage } from './tab-list-promos.page';

const routes: Routes = [
  {
    path: '',
    component: TabListPromosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabListPromosPageRoutingModule {}
