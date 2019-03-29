import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

import {NegocioProvider} from '../../providers/negocio/negocio';

import {HomeNegocioPage} from '../index.paginas';


@Component({
  selector: 'page-login-negocio',
  templateUrl: 'login-negocio.html',
})
export class LoginNegocioPage {

  user:string = "";
  pass:string = "";

  constructor(public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams, private _np:NegocioProvider) {
  }

  ionViewDidLoad(){
    this.menuCtrl.swipeEnable(false);
  }

  ingresar(){
    this._np.ingresar(this.user, this.pass).subscribe(()=>{
      if(this._np.activo()){
          this.navCtrl.setRoot(HomeNegocioPage);
      }
    })
  }

}
