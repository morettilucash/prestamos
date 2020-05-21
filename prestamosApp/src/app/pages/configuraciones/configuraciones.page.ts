import { Component, OnInit } from '@angular/core';
import { Endpoint } from 'src/app/endpoint';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.page.html',
  styleUrls: ['./configuraciones.page.scss'],
})
export class ConfiguracionesPage implements OnInit {

  public PORT: string;
  public IP: string;

  constructor() { }

  ngOnInit() {
    let url: string = Endpoint.UrlRest;
    let u: string = '';


    for (let i = 0; i < url.length; i++) {
      if (url.charAt(i) == ":" && i != 4) {
        this.IP += url.substr(0, i)
      }
      else {
        url.charAt(i);
      }
    }
  }

  save() {
    Endpoint.UrlRest = `${this.IP}:${this.PORT}/api/v1`
    console.log('Endpoint.UrlRest', Endpoint.UrlRest);
  }


}
