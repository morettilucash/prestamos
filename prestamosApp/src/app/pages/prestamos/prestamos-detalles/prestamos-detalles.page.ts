import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Prestamos } from 'src/app/models/prestamos';
import { PrestamosService } from 'src/app/services/prestamos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Pagos } from 'src/app/models/pagos';
import { PagosService } from 'src/app/services/pagos.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { tap } from 'rxjs/operators';

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
  vencimiento: Date;
  monto_cuota: number

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
          console.log('saldo',this.prestamo.saldo);
          console.log('cantidad_cuotas',this.prestamo.cantidad_cuotas);
          
          this.monto_cuota = (this.prestamo.saldo / this.prestamo.cantidad_cuotas);
        })
      );
  }

  regresar() {
    this._router.navigate(['prestamos']);
  }

  savePago() {
    const pago: Pagos = new Pagos();
    pago.monto = this.monto;
    pago.nro_cuota = this.nro_cuota;
    pago.vencimiento = this.vencimiento;
    pago.prestamoId = this.prestamoId;



    console.log('this.prestamo', this.prestamo);



    if (pago.monto === null || pago.monto === undefined) {
      return this._toast.presentToast('Completa el monto.');
    }
    if (pago.nro_cuota === null || pago.nro_cuota === undefined) {
      return this._toast.presentToast('Completa el nro de cuota.');
    }
    if (pago.vencimiento === null || pago.vencimiento === undefined) {
      return this._toast.presentToast('Completa el vencimiento.');
    }

    // this._pagos.post(pago).subscribe(
    //   (data) => {
    //     this.getByIdPrestamo();
    //     this.cleanPago();
    //   },
    //   err => { console.log('Error', err); }
    // );
  }

  cleanPago() {
    this.monto = null;
    this.nro_cuota = null;
    this.vencimiento = null;
  }
}
