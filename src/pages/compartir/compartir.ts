import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';

import {UsuarioProvider} from '../../providers/index.providers';


@Component({
  selector: 'page-compartir',
  templateUrl: 'compartir.html',
})
export class CompartirPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing, private _up: UsuarioProvider, public alertCtrl: AlertController) {
  }


  // fbShare(){
  //   this.socialSharing.shareViaFacebook("¡Hola, te estamos esperando! descarga ya Monedero Virtual", null,  "http://www.innovathing.com.mx/").then(() =>{
  //
  //   }).catch((error) => {
  //     this.errorNotificationfb();
  //   });
  // }
  //
  // waShare(){
  //   this.socialSharing.shareViaWhatsApp("¡Hola! registrare con mi código: "+this._up.codigo+" en Monedero Virtual", null,  "http://www.innovathing.com.mx/").then(() =>{
  //
  //   }).catch((error) => {
  //     this.errorNotificationwpp();
  //   });
  // }
  //
  // ttShare(){
  //   this.socialSharing.shareViaTwitter("¡Hola! registrare con mi código: "+this._up.codigo+" en Monedero Virtual", null,  "http://www.innovathing.com.mx/").then(() =>{
  //
  //   }).catch((error) => {
  //     this.errorNotificationtw();
  //   });
  // }
  //
  // errorNotificationfb(){
  //
  //   this.alertCtrl.create({
  //         title:"¡Error!",
  //         subTitle: "Por favor revisa que tengas instalada la aplicación de Facebook",
  //         buttons: ["Ok"]
  //   }).present();
  //
  //   return;
  //
  //   }
  //
  //   errorNotificationwpp(){
  //
  //     this.alertCtrl.create({
  //           title:"¡Error!",
  //           subTitle: "Por favor revisa que tengas instalada la aplicación de WhatsApp",
  //           buttons: ["Ok"]
  //     }).present();
  //
  //     return;
  //
  //   }
  //
  //   errorNotificationtw(){
  //
  //     this.alertCtrl.create({
  //           title:"¡Error!",
  //           subTitle: "Por favor revisa que tengas instalada la aplicación de Twitter",
  //           buttons: ["Ok"]
  //     }).present();
  //
  //     return;
  //
  //   }

}
