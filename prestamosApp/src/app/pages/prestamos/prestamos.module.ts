import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrestamosPageRoutingModule } from './prestamos-routing.module';

import { PrestamosPage } from './prestamos.page';
import { PaginacionComponent } from 'src/app/services/globales/paginacion/paginacion.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrestamosPageRoutingModule
  ],
  declarations: [PrestamosPage, PaginacionComponent]
})
export class PrestamosPageModule { }
