import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigurationAutomatiquePageRoutingModule } from './configuration-automatique-routing.module';

import { ConfigurationAutomatiquePage } from './configuration-automatique.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    ConfigurationAutomatiquePageRoutingModule,
  ],
  declarations: [ConfigurationAutomatiquePage],
})
export class ConfigurationAutomatiquePageModule {}
