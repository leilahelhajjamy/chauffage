import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigurationchoixPage } from './configurationchoix.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationchoixPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationchoixPageRoutingModule {}
