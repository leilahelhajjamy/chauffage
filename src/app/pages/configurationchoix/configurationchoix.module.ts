import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigurationchoixPageRoutingModule } from './configurationchoix-routing.module';

import { ConfigurationchoixPage } from './configurationchoix.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigurationchoixPageRoutingModule
  ],
  declarations: [ConfigurationchoixPage]
})
export class ConfigurationchoixPageModule {}
