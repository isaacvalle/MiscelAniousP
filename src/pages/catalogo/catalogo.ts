import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CatalogoProvider, UsuarioProvider} from '../../providers/index.providers';

import {PorCategoriaPage } from '../index.paginas';


@Component({
  selector: 'page-catalogo',
  templateUrl: 'catalogo.html',
})
export class CatalogoPage {

  porcategoPagina:any = PorCategoriaPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _cp: CatalogoProvider, private _up: UsuarioProvider) {

  }

  ionViewWillEnter(){
    this._cp.cargar_catalogo();
  }


}
