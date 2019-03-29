import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform, MenuController } from 'ionic-angular';

import { Vibration } from '@ionic-native/vibration';

import {UsuarioProvider} from '../../providers/index.providers';

import {HomePage} from '../index.paginas';


@Component({
  selector: 'page-cambiar-pass',
  templateUrl: 'cambiar-pass.html',
})
export class CambiarPassPage {

  email:string = "";
  contrasena:string = "";
  confcontrasena:string = "";

  constructor(public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private platform:Platform, private vibration: Vibration, private _up:UsuarioProvider) {
  }
  ionViewDidLoad(){
    this.menuCtrl.swipeEnable(false);
  }

  cambiar(){
    if(this.email == "" || this.contrasena == "" || this.confcontrasena == ""){

      if(this.platform.is("cordova")){
        this.vibration.vibrate(500);
      }
      this.alertCtrl.create({
            title:"Oops!",
            subTitle: "No has llenado todos los campos",
            buttons: ["Ok"]
      }).present();
      return;
    }else{

      if(this.contrasena != this.confcontrasena){

        if(this.platform.is("cordova")){
          this.vibration.vibrate(500);
        }
        this.alertCtrl.create({
              title:"Error!",
              subTitle: "Las contraseñas no son iguales",
              buttons: ["Ok"]
        }).present();
        return;
      }
      this.validarCorreo(this.email);
    }
  }

  validarCorreo(email){

    let exprecion = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

    if(!exprecion.test(email)){

      if(this.platform.is("cordova")){
        this.vibration.vibrate(500);
      }
      this.alertCtrl.create({
            title:"Caracteres no validos!",
            subTitle: "No se permiten caracteres especiales en el correo electrónico",
            buttons: ["Ok"]
      }).present();
      return;
    }else{

      this._up.cambiarpass(this.email, this.contrasena);
      this.navCtrl.push(HomePage);
    }
  }

}
