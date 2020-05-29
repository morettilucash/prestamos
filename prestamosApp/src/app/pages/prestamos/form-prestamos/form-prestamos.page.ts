import { Component, OnInit } from '@angular/core';
import { Prestamos } from 'src/app/models/prestamos';
import { Subscription } from 'rxjs';
import { ClientesService } from 'src/app/services/clientes.service';
import { Clientes } from 'src/app/models/clientes';
import { ToastsService } from 'src/app/services/toasts.service';
import { PrestamosService } from 'src/app/services/prestamos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-prestamos',
  templateUrl: './form-prestamos.page.html',
  styleUrls: ['./form-prestamos.page.scss'],
})
export class FormPrestamosPage implements OnInit {

  prestamo: Prestamos;
  cliSubs: Subscription;
  // cliente: Clientes = null;

  constructor(private _cliente: ClientesService, private _toast: ToastsService, private _prestamo: PrestamosService,
    private _router: Router) {

    this.cliSubs = this._cliente.obsUser().subscribe(
      (cliente: Clientes) => {
        this.prestamo = new Prestamos();
        this.prestamo.id = null;
        this.prestamo.monto = null;
        this.prestamo.fecha_hora = null;
        this.prestamo.vencimiento = null;
        this.prestamo.tasa_interes = null;
        this.prestamo.intereses = null;
        this.prestamo.cantidad_cuotas = null;
        this.prestamo.cuotas_pagadas = 0;
        this.prestamo.tipo_pago = 'Mensual';
        this.prestamo.saldo = null;
        this.prestamo.estado = 'Vigente';
        this.prestamo.clienteId = cliente;
      }

    )
  }

  ngOnInit() {
  }

  post() {

    if (this.prestamo.monto == null) { return this._toast.presentToast('Completa el monto.'); }
    if (this.prestamo.fecha_hora == null) { return this._toast.presentToast('Completa la Fecha y hora.'); }
    if (this.prestamo.vencimiento == null) { return this._toast.presentToast('Completa el vencimiento.'); }
    if (this.prestamo.tasa_interes == null) { return this._toast.presentToast('Completa la tasa de interés.'); }
    if (this.prestamo.intereses == null) { return this._toast.presentToast('Completa los intereses.'); }
    if (this.prestamo.cantidad_cuotas == null) { return this._toast.presentToast('Completa la cantidad de cuotas.'); }
    if (this.prestamo.tipo_pago == null) { return this._toast.presentToast('Completa el tipo de pago.'); }
    if (this.prestamo.estado == null) { return this._toast.presentToast('Completa el estado.'); }

    this.prestamo.saldo = this.prestamo.monto;

    this._prestamo.post(this.prestamo).subscribe(
      (data) => {
        console.log('Prestamo cargado con éxito');
        this._toast.presentToast('Prestamo cargado con éxito');
        this.clean()
        this._router.navigate(['prestamos'])
      },
      err => {
        console.log('Error:', err);
        this._toast.presentToast(err)
      }
    );
  }

  clean() {
    this.prestamo.monto = null;
    this.prestamo.fecha_hora = null;
    this.prestamo.vencimiento = null;
    this.prestamo.tasa_interes = null;
    this.prestamo.intereses = null;
    this.prestamo.cantidad_cuotas = null;
    this.prestamo.tipo_pago = null;
    this.prestamo.estado = null;
  }




}
