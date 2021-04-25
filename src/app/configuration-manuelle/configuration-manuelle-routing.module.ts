import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigurationManuellePage } from './configuration-manuelle.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationManuellePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationManuellePageRoutingModule {}
