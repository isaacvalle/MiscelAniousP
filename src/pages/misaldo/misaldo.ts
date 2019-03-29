import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {UsuarioProvider, PuntosProvider, CatalogoProvider} from '../../providers/index.providers';

import {CuentaPuntosPage} from '../index.paginas';

import { AppRate } from '@ionic-native/app-rate';


@Component({
  selector: 'page-misaldo',
  templateUrl: 'misaldo.html',
})
export class MisaldoPage {

  paginaCuentaPuntos:any = CuentaPuntosPage;


  constructor(public navCtrl: NavController, public navParams: NavParams, private _up:UsuarioProvider, private _pp:PuntosProvider, private _cp:CatalogoProvider, private appRate: AppRate) {
    this._pp.puntosUsuarioNegocio(Number(this._up.id_usuario));

  }

  ionViewWillEnter(){
    this._pp.puntosUsuarioNegocio(Number(this._up.id_usuario));
  }

  ionViewDidEnter(){

      this.appRate.preferences = {
        displayAppName: 'Monedero Virtual',
        usesUntilPrompt: 5,
        storeAppURL: {
          ios: '1216856883',
          android: 'market://details?id=com.devdactic.crossingnumbers'
        },
        customLocale: {
          title: 'Que te pareció %@?',
          message: 'Si te gustó %@. Te tomarías un monento para calificar la aplicación?',
          cancelButtonLabel: 'No, Gracias',
          laterButtonLabel: 'Más tarde',
          rateButtonLabel: 'Calificar ahora'
        },
        callbacks: {
          onRateDialogShow: function(callback){},
          onButtonClicked: function(buttonIndex){}
        }
      }
      this.appRate.promptForRating(false);

  }

  recargar_pagina(refresher:any) {
    setTimeout(() => {
      this._pp.puntosUsuarioNegocio(Number(this._up.id_usuario));
      refresher.complete();
    }, 2000);
  }

}
