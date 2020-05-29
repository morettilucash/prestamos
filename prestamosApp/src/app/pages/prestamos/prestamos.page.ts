import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Prestamos } from 'src/app/models/prestamos';
import { PrestamosService } from 'src/app/services/prestamos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PaginacionService } from 'src/app/services/globales/paginacion/paginacion.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.page.html',
  styleUrls: ['./prestamos.page.scss'],
})
export class PrestamosPage implements OnInit {

  // prestamos$: Observable<Prestamos[]>;
  prestamos: Prestamos[] = [];
  clienteId: number;

  size: number = 10;
  nro: number = 0;
  estado: string = 'Todos';
  order: string = 'fecha_hora';
  ad: string = 'DESC'; // asc. y desc.

  constructor(private _prestamos: PrestamosService, private _router: Router, private _actRoute: ActivatedRoute, private _pag: PaginacionService) { }

  ngOnInit() {
    // this.clienteId = parseInt(this._actRoute.snapshot.paramMap.get('id'));
    // if (this.clienteId) {
    //   console.log('Obteniendo x id cliente:', this.clienteId);
    //   this.getByIdCliente();
    // } else {
    //   console.log('Obteniendo todos');
    //   this.getAll();
    // }
  }

  getAll() {
    this._prestamos.getAll().subscribe(
      (data: Prestamos[]) => {
        this.prestamos = data; console.log('prestamos', data);
      },
      err => { console.log('Error: ', err); }
    )
  }

  getByIdCliente() {
    this._prestamos.getByIdCliente(this.clienteId).subscribe(
      (data: Prestamos[]) => {
        console.log('getByIdCliente', data);
        this.prestamos = data;
      },
      err => { console.log('Error: ', err); }
    )
  }

  edit(c: Prestamos) {
    this._router.navigate(['form-prestamos'])
      .then(() => {
        // this.showForm = true;
        // this._prestamos.
      });
  }

  pageChanged(event: { pageNro: number; pageSize: number; }) {
    this.nro = event.pageNro;
    this.size = event.pageSize;
    this.getPag();
  }

  reset(event: any) {  // reseteamos el nro de paginado
    console.log('event', event);
    this._pag.setPag(0);
    this.getPag();
  }

  verPrestamo(prestamoId: number) {
    this._router.navigate(['prestamos/detalles/', prestamoId]);
  }

  getPag() {
    console.log('getPag');
    console.log('this.size, this.nro, this.estado, this.order, this.ad');
    console.log(this.size, this.nro, this.estado, this.order, this.ad);

    this.prestamos = [];
    this._prestamos.getPaginated(this.size, this.nro, this.estado, this.order, this.ad)
      .subscribe(
        (data: Prestamos[]) => {
          if (data.length === 0) {
            this._pag.setBlockBtn(true);
          } else {
            this._pag.setBlockBtn(false);
            this.prestamos = data;
          }
        },
        err => {
          console.log(err);

        }
      );

  }

}
