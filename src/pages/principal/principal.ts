import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {UsuarioProvider} from '../../providers/index.providers';


@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private _up:UsuarioProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrincipalPage');
  }

}
