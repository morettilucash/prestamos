import { Component, OnInit } from '@angular/core';
import { Clientes, ClientesJson } from 'src/app/models/clientes';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  cliente: Clientes = ClientesJson.ClientesJson ;

  constructor() { }

  ngOnInit() {
  }



}
