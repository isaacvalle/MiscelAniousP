import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-detalle-evento',
  templateUrl: 'detalle-evento.html',
})
export class DetalleEventoPage {
  infoEvento:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.infoEvento = this.navParams.get("datosEvento");
    console.log(this.infoEvento)
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad DetalleEventoPage');
  }

}
