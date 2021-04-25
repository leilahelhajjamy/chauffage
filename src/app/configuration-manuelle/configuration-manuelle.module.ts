import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigurationManuellePageRoutingModule } from './configuration-manuelle-routing.module';

import { ConfigurationManuellePage } from './configuration-manuelle.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigurationManuellePageRoutingModule,
  ],
  declarations: [ConfigurationManuellePage],
})
export class ConfigurationManuellePageModule {}
