import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  
  public selectedIndex = 0;
  public appPages = [

    {
      title: 'Clientes',
      url: 'clientes',
      icon: 'people'
    },
    {
      title: 'Préstamos',
      url: 'prestamos',
      icon: 'wallet'
    },
    {
      title: 'Pagos',
      url: 'pagos',
      icon: 'list'
    },
    {
      title: 'Estadísticas',
      url: 'estadisticas',
      icon: 'bar-chart'
    }
  ];
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    
  }
}
