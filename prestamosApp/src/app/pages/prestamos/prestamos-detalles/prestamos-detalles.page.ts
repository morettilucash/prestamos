import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Prestamos } from 'src/app/models/prestamos';
import { PrestamosService } from 'src/app/services/prestamos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Pagos } from 'src/app/models/pagos';
import { PagosService } from 'src/app/services/pagos.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-prestamos-detalles',
  templateUrl: './prestamos-detalles.page.html',
  styleUrls: ['./prestamos-detalles.page.scss'],
})
export class PrestamosDetallesPage implements OnInit {

  prestamo$: Observable<Prestamos>;
  prestamo: Prestamos;
  prestamoId: number;
  monto: number;
  nro_cuota: number;
  monto_cuota: number
  fcHoy: any = moment().format();

  constructor(private _prestamos: PrestamosService, private _router: Router, private _actRoute: ActivatedRoute,
    private _pagos: PagosService, public _toast: ToastsService) { }

  ngOnInit() {
    this.prestamoId = parseInt(this._actRoute.snapshot.paramMap.get('id'));
    this.getByIdPrestamo();
  }

  getByIdPrestamo() {
    this.prestamo$ = this._prestamos.get(this.prestamoId)
      .pipe(
        tap(p => {
          this.prestamo = p;
          this.monto_cuota = (this.prestamo.monto + this.prestamo.intereses) / this.prestamo.cantidad_cuotas;
        })
      );
  }

  regresar() {
    this._router.navigate(['prestamos']);
  }

  async savePago() {
    const pago: Pagos = new Pagos();
    pago.monto = this.monto;
    pago.ganancia = await this.calcGananciaCuota();
    console.log('ganancia cuota', pago.ganancia);

    pago.nro_cuota = this.prestamo.cuotas_pagadas + 1;
    pago.fecha_hora = this.fcHoy;
    pago.prestamoId = this.prestamoId;

    if (pago.monto === null || pago.monto === undefined) {
      return this._toast.presentToast('Completa el monto.');
    }
    if (pago.fecha_hora === null || pago.fecha_hora === undefined) {
      return this._toast.presentToast('Completa el vencimiento.');
    }

    this._pagos.post(pago).toPromise()
      .then(res => { this.updatePrestamo('P'); })
      .catch(err => { this._toast.errorToast('Error'); console.log('Error', err); });
  }

  /**
   * 
   * @param tipo Tipo de update(si hace un delete(D) o post(P) de pago);
   */
  async updatePrestamo(tipo?: string) {
    // Obtenemos el prestamos con el nuevo pago y luego lo actualizamos.
    this._prestamos.get(this.prestamoId).toPromise()
      .then(async prest => {
        this.prestamo = prest;

        if (tipo === 'P')
          this.prestamo.cuotas_pagadas++;
        else if (tipo === 'D')
          this.prestamo.cuotas_pagadas--;

        this.prestamo.saldo = await this.calcSaldoPendiente(tipo);

        if (this.prestamo.saldo === 0)
          this.prestamo.estado = 'Saldado';
        else
          this.prestamo.estado = 'Vigente';


        this.prestamo$ = this._prestamos.update(this.prestamo).pipe(
          tap(p => {
            this.monto_cuota = (this.prestamo.monto + this.prestamo.intereses) / this.prestamo.cantidad_cuotas;
            this.prestamo = {};
            this.prestamo = p;
            console.log('Prestamo actualizado:', this.prestamo);
            this._toast.successToast('¡Préstamo actualizado!');
            this.monto_cuota = (p.monto + p.intereses) / p.cantidad_cuotas;
            this.cleanPago();
          })
        );
      })
      .catch(err => {
        this._toast.errorToast('Se produjo un error');
      });
  }

  /**
   * 
   * @param tipo Tipo de update(si hace un delete(D) o post(P) de pago);
   * para actualizar correctamente el saldo del prestamo
   */
  async calcSaldoPendiente(tipo: string): Promise<number> {
    return new Promise<number>((resolve/*, reject */) => {
      if (tipo === 'P')
        resolve(this.prestamo.saldo - this.monto);
      else if (tipo === 'D')
        resolve(this.prestamo.saldo + this.monto);
    });
  }

  async calcGananciaCuota(): Promise<number> {
    return new Promise<number>((resolve/*, reject */) => {
      // t = total a pagar del prestamo
      let t = this.prestamo.monto + this.prestamo.intereses;
      // x = total prestamo / monto de la cuota
      let x = t / this.monto;
      // z = monto de la cuota / x
      let z = this.prestamo.monto / x;
      // ganancia = monto cuota - z
      let gan = this.monto - z;

      resolve(gan);
    });
  }

  cleanPago() {
    this.monto = null;
    this.nro_cuota = null;
  }

  async deletePago(pa: Pagos) {
    let tit: string = '¡Eliminar pago!';
    let msg: string = '¿Estás seguro?';
    let alert = await this._toast.deleteToast(tit, msg)

    alert.present();
    alert.onDidDismiss().then(((res) => {
      if (res.role === "cancel") {
        return;
      }
      else {
        // Como se va a eliminar, necesitamos pasarle el monto al input del pago, 
        // que después lo toma para actualizar el saldo.
        this.monto = pa.monto;

        this._pagos.delete(pa.id).subscribe(
          () => {
            this.updatePrestamo('D');
          },
          err => console.log(err)
        );
      }
    }));
  }

}
