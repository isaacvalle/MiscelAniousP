import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {CatalogoProvider, UsuarioProvider} from '../../providers/index.providers';

import {InfoNegocioPage} from '../index.paginas';


@Component({
  selector: 'page-por-categoria',
  templateUrl: 'por-categoria.html',
})
export class PorCategoriaPage {

  categoria:any ={};
  paginaInfoNegocio:any = InfoNegocioPage;


  constructor(public navCtrl: NavController, public navParams: NavParams, private _cp:CatalogoProvider, private _up:UsuarioProvider) {

    this.categoria = this.navParams.get("categoria");

    this._up.cargar_storage();

    if(this._up.municipio == 'vacio' ){
      this._cp.negociosporEstado(this.categoria.id, this._up.estado);
    }else{
      this._cp.negociosporEstado_municipio(this.categoria.id, this._up.estado, this._up.municipio);
    }

  }

  ionViewWillEnter(){
    this._up.cargar_storage();

    if(this._up.municipio == 'vacio' ){
      this._cp.negociosporEstado(this.categoria.id, this._up.estado);
    }else{
      this._cp.negociosporEstado_municipio(this.categoria.id, this._up.estado, this._up.municipio);
    }
  }

}
