import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormClientePageRoutingModule } from './form-cliente-routing.module';

import { FormClientePage } from './form-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormClientePageRoutingModule
  ],
  declarations: [FormClientePage]
})
export class FormClientePageModule {}
