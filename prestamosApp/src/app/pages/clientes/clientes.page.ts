import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Clientes } from 'src/app/models/clientes';
import { ClientesService } from 'src/app/services/clientes.service';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { Router } from '@angular/router';
import { PaginacionService } from 'src/app/services/globales/paginacion/paginacion.service';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss']
})
export class ClientesPage implements OnInit, AfterViewInit {

  evtSus: Subscription;
  clientes$: Observable<Clientes[]>;
  attr: string = 'apellido';
  filter: string = '';
  size: number = 10;
  nro: number = 0;

  @ViewChild('input', { read: ElementRef }) input: ElementRef;

  constructor(private _clientes: ClientesService, private _router: Router, private _pag: PaginacionService) { }

  ngOnInit() {
    // this.getPag();
  }

  ngAfterViewInit() {
    this.evtSus = fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(450),
        distinctUntilChanged(),
        tap(() => { this.reset(); })
      )
      .subscribe();
  }

  pageChanged(event: { pageNro: number; pageSize: number; }) {
    this.nro = event.pageNro;
    this.size = event.pageSize;
    this.getPag();
  }

  reset() {  // reseteamos el nro de paginado
    this._pag.setPag(0);
    this.getPag();
  }

  getAll() {
    this.clientes$ = this._clientes.getAll();
  }

  edit(c: Clientes) {
    this._router.navigate(['form-clientes'])
      .then(() => {
        // this.showForm = true;
        this._clientes.passUser(c);
      });
  }

  getPag() {
    console.log('ejecutando getPag');
    this.clientes$ = this._clientes.getPaginatedByTxt(this.size, this.nro, this.attr, this.filter)
      .pipe(tap((data: Clientes[]) => {
        if (data.length === 0) {
          this._pag.setBlockBtn(true);
        } else {
          this._pag.setBlockBtn(false);
        }
      }));
  }

  new() {
    const c: Clientes = new Clientes();
    c.id = null;
    c.nombre = null;
    c.apellido = null;
    c.telefono = null;
    c.email = null;
    c.localidad = null;
    c.domicilio = null;
    this._router.navigate(['form-clientes'])
      .then(() => {
        // this.showForm = true;
        this._clientes.passUser(c);
      });
  }

  verPrestamos(clienteId: number) {
    this._router.navigate(['prestamos/cliente/', clienteId])
  }

  delete(id: number) {
    this._clientes.delete(id).toPromise()
      .then(() => { this.getAll() })
      .catch(err => { console.log(err) })
  }

  newPrestamo(c: Clientes) {
    this._router.navigate(['prestamos/form-prestamos'])
      .then(() => {
        // this.showForm = true;
        this._clientes.passUser(c);
      });

  }

}
