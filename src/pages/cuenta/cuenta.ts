import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import {UsuarioProvider, HistorialProvider} from '../../providers/index.providers';

import { SocialSharing } from '@ionic-native/social-sharing'

import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'page-cuenta',
  templateUrl: 'cuenta.html',
})
export class CuentaPage {

  dato:string;

  datoEncriptado:string;

  currentImage = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _up:UsuarioProvider, private _hp:HistorialProvider, private socialSharing: SocialSharing, public alertCtrl: AlertController, private camera: Camera) {

    this.dato = this._up.id_usuario + "&" + this._up.nombre;


    let nuevo = JSON.stringify(this.dato);



    let c1;
    let c2;
    let c3;
    var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

    this.datoEncriptado = Base64.encode(nuevo);

  }

  ionViewWillEnter(){
    this.cargarHistorial();
  }

  fbShare(){
    this.socialSharing.shareViaFacebook("¡Hola, te estamos esperando! descarga ya Monedero Virtual", null,  "http://www.innovathing.com.mx/").then(() =>{

    }).catch((error) => {
      this.errorNotificationfb();
    });
  }

  waShare(){
    this.socialSharing.shareViaWhatsApp("¡Hola! registrare con mi código: "+this._up.codigo+" en Monedero Virtual", null,  "http://www.innovathing.com.mx/").then(() =>{

    }).catch((error) => {
      this.errorNotificationwpp();
    });
  }

  ttShare(){
    this.socialSharing.shareViaTwitter("¡Hola! registrare con mi código: "+this._up.codigo+" en Monedero Virtual", null,  "http://www.innovathing.com.mx/").then(() =>{

    }).catch((error) => {
      this.errorNotificationtw();
    });
  }

  loadImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then(data => {
      this.currentImage = 'data:image/jpeg;base64,' + data;
     }, err => {
      // Handle error
      console.log(err)
     });
  }

  igShare(){
    this.socialSharing.shareViaInstagram("¡Hola! registrare con mi código: "+this._up.codigo+" en Monedero Virtual http://www.innovathing.com.mx/", this.currentImage).then(() =>{

    }).catch((error) => {
      this.errorNotificationig();
    });
  }

  errorNotificationfb(){

    this.alertCtrl.create({
          title:"¡Error!",
          subTitle: "Por favor revisa que tengas instalada la aplicación de Facebook",
          buttons: ["Ok"]
    }).present();

    return;

  }

  errorNotificationwpp(){

    this.alertCtrl.create({
          title:"¡Error!",
          subTitle: "Por favor revisa que tengas instalada la aplicación de WhatsApp",
          buttons: ["Ok"]
    }).present();

    return;

  }

  errorNotificationtw(){

    this.alertCtrl.create({
          title:"¡Error!",
          subTitle: "Por favor revisa que tengas instalada la aplicación de Twitter",
          buttons: ["Ok"]
    }).present();

    return;

  }

  errorNotificationig(){

    this.alertCtrl.create({
          title:"¡Error!",
          subTitle: "Por favor revisa que tengas instalada la aplicación de Instagram",
          buttons: ["Ok"]
    }).present();

    return;

  }

  subirImgIg(){

  }


  ionViewWillLeave(){
    this._hp.pagina = 0;
    this._hp.transacciones = [];
  }

  cargarHistorial(){
      this._hp.historial(this._up.id_usuario);
  }

  siguiente_pagina(infiniteScroll){
    this._hp.historial(this._up.id_usuario).then(()=>{
      infiniteScroll.complete();
    });
  }

  mostrarMenos(){
    this._hp.pagina = 0;
    this._hp.transacciones = [];
    this.cargarHistorial();
  }



}
