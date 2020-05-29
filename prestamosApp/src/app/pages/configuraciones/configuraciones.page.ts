import { Component, OnInit } from '@angular/core';
import { Endpoint } from 'src/app/endpoint';
import { EndpointsService } from 'src/app/services/endpoints.service';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.page.html',
  styleUrls: ['./configuraciones.page.scss'],
})
export class ConfiguracionesPage implements OnInit {

  public PORT: string;
  public IP: string;

  constructor(private _ep: EndpointsService) { }

  ngOnInit() {

  }

  save() {
    Endpoint.UrlRest = `${this.IP}:${this.PORT}/api/v1`;
    this._ep.UrlRest = `${this.IP}:${this.PORT}/api/v1`;
    console.log('Endpoint.UrlRest', Endpoint.UrlRest);
    console.log('this._ep.UrlRest', this._ep.UrlRest);

  }


}
