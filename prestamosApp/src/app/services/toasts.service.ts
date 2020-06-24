import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastsService {

  constructor( public toastController: ToastController) { }

  async presentToast(msj) {
    const toast = await this.toastController.create({
      color: 'tertiary',
      message: msj,
      duration: 2000
    });
    toast.present();
  }

}
