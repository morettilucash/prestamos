import { Component, OnInit } from '@angular/core';
import { Clientes  } from 'src/app/models/clientes';
import { ClientesService } from 'src/app/services/clientes.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  clientes$: Observable<Clientes[]>;
  showForm: boolean = false;

  constructor(private _clientes: ClientesService, private _router: Router) { }

  ngOnInit() {
    this.getAll();
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

  verPrestamos() {
    this._router.navigate(['prestamos'])
      .then(() => {
        // this.showForm = true;
        // this._clientes.passUser(c);
      });
  }

}
