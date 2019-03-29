import { Http, Headers, RequestOptions } from '@angular/http';
import { Component } from '@angular/core';
import { NavController, Platform, ToastController, AlertController, LoadingController, MenuController } from 'ionic-angular';
import 'rxjs/add/operator/map';

import {URL_VIRTSERVER} from '../../config/url.servicios';

import {NegocioProvider} from '../../providers/negocio/negocio';

import { HistorialProvider } from "../../providers/historial/historial";

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import {HomePage} from '../index.paginas';


@Component({
  selector: 'page-home-negocio',
  templateUrl: 'home-negocio.html',
})
export class HomeNegocioPage {

  public scannedCode:string;
  datos:any = [];
  cantidad:any;
  abc:number;
  alerta:any;
  id_categoria:number;
  id_negocio:number;
  public hideForm:boolean = false;

  decodificado:string;

  pagoBtn:boolean = false;
  cobroBtn:boolean = false;
  tipo:number;

  //configuracion de lottie animations
  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 3;

  constructor(private http: Http,
              public navCtrl: NavController,
              private platform: Platform,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private _np:NegocioProvider,
              private _hp:HistorialProvider,
              private barcodeScanner: BarcodeScanner,
              private loadingCtrl: LoadingController,
              public menuCtrl: MenuController) {
    this.lottieConfig = {
        path: 'assets/menu-ios.json',
        autoplay: false,
        loop: false,
        autoloadSegments: false
    };
  }

  menuActive(){
    this.menuCtrl.enable(false, 'users');
    this.menuCtrl.enable(true, 'admin');
  }

  ionViewWillEnter(){
    this.anim.playSegments([[40, 90]], true);
    this.id_categoria = Number(this._np.id_categoria);
    this.id_negocio = Number(this._np.id_negocio);
    // this.menuCtrl.enable(true, 'admin');
    // this.menuCtrl.enable(false, 'user');
    this.menuCtrl.swipeEnable(true);
    this.menuCtrl.get().ionOpen.subscribe(()=>{
      this.play();
      // console.log("abierto")
    });
    this.menuCtrl.get().ionClose.subscribe(()=>{
      this.pause();
      // console.log("cerrado")
    });
  }

  handleAnimation(anim: any) {
      this.anim = anim;
      // console.log(anim)
  }

  play() {
      this.anim.setSpeed(this.animationSpeed);
      this.anim.playSegments([[42, 10]], true);
  }

  pause() {
      this.anim.setSpeed(this.animationSpeed);
      this.anim.playSegments([[10, 90]], true);
  }

  ionViewWillLeave(){
    this._hp.pagina = 0;
    this._hp.transaccionesAdm = [];
  }

  siguiente_pagina(infiniteScroll){
    this._hp.historialAdm(this.id_negocio, this.tipo).then(()=>{
      infiniteScroll.complete();
    });
  }

  btnPago(){
    this._hp.transaccionesAdm = [];
    this.pagoBtn = true;
    this.cobroBtn = false;
    this.tipo = 1;
    this._hp.pagina = 0;
    this.mostrar_loading();
    this._hp.historialAdm(this.id_negocio, this.tipo);
  }

  btnCobro(){
    this._hp.transaccionesAdm = [];
    this.cobroBtn = true;
    this.pagoBtn = false;
    this.tipo = 0;
    this._hp.pagina = 0;
    this.mostrar_loading();
    this._hp.historialAdm(this.id_negocio, this.tipo);
  }

  mostrar_loading(){
    let loader = this.loadingCtrl.create({
      content: "Cargando...",
      spinner: "crescent",
      duration: 1500
    });
    loader.present();
  }

  scanCode(){
    if (!this.platform.is('cordova')){

      console.log("Estoy en la computadora y por ende no puedo leer códigos.");
      return;
    }else{

      this.barcodeScanner.scan().then((barcodeData) => {
      this.scannedCode = barcodeData.text;

        let c1;
        let c2;
        let c3;
        var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

        this.decodificado = Base64.decode(this.scannedCode);

        this.datos = JSON.parse(this.decodificado).split('&');


      }, (err) => {
        console.log('Error: ', err);
      });
    }
  }

  boton(){

    let validacion = /^[0-9]*$/;

    if(!this.datos[1]){
      this.alertCtrl.create({
        title: 'No has leido el codigo',
        subTitle: 'Por favor, lee el codigo QR del cliente.',
        buttons: ['OK']
      }).present();

    }else{

      if(this.cantidad == null || this.cantidad <= 0){
        this.alertCtrl.create({
          title: 'Ingrese cantidad',
          subTitle: 'Proporcione una cantidad válida para agregar al cliente.',
          buttons: ['OK']
        }).present();
      }else if(!validacion.test(this.cantidad)){
        this.alertCtrl.create({
          title: 'Caracteres incorrectos',
          subTitle: 'Por favor, ingrese sólo números. Letras, puntos y comas no están permitidos.',
          buttons: ['OK']
        }).present();
      }

      if(this.cantidad > 0 && validacion.test(this.cantidad)){
        this.alertCtrl.create({
          title: 'Confirmación',
          subTitle: '¿Está seguro de pagar ' + this.cantidad + " VirtPoints al usuario?",
          buttons: [
                    {
                      text: 'Cancelar',
                      handler: data => {

                      }
                    },
                    {
                      text: 'Aceptar',
                      handler: data => {
                        this.abc = 1;
                        this.updateEntry();
                        this.cantidad = null;
                        this.datos = [];
                      }
                    }
                  ]
        }).present();
      }
    }
  }

  botonCobro(){

    let validacion = /^[0-9]*$/;

    if(!this.datos[1]){
      this.alertCtrl.create({
        title: 'No has leido el codigo',
        subTitle: 'Por favor, lee el codigo QR del cliente.',
        buttons: ['OK']
      }).present();

    }else{

      if(this.cantidad == null || this.cantidad <= 0){
        this.alertCtrl.create({
          title: 'Ingrese cantidad',
          subTitle: 'Proporcione una cantidad válidad para agregar al cliente.',
          buttons: ['OK']
        }).present();
      }else if(!validacion.test(this.cantidad)){
        this.alertCtrl.create({
          title: 'Caracteres incorrectos',
          subTitle: 'Por favor, ingrese sólo números. Letras y otros caracteres como puntos y comas no están permitidos.',
          buttons: ['OK']
        }).present();
      }
      if(this.cantidad > 0 && validacion.test(this.cantidad)){
        this.alertCtrl.create({
          title: 'Confirmación',
          subTitle: '¿Está seguro de cobrar ' + this.cantidad + " VirtPoints al usuario?",
          buttons: [
                    {
                      text: 'Cancelar',
                      handler: data => {

                      }
                    },
                    {
                      text: 'Aceptar',
                      handler: data => {
                        this.abc = 0;
                        this.updateEntry();
                        this.cantidad = null;
                        this.datos = [];
                      }
                    }
                  ]
        }).present();
      }
    }
  }

  crear_toast(){
    this.toastCtrl.create({
      message: this.alerta,
      duration: 3000
    }).present();
  }

  updateEntry(){

    let body:string = "id_usuario=" + this.datos[0] + "&id_negocio=" + this.id_negocio + "&id_categoria=" + this.id_categoria + "&puntostotal=" + this.cantidad + "&bandera=" + this.abc,
        type:string = "application/x-www-form-urlencoded; charset=UTF-8",
        headers:any = new Headers({ 'Content-Type': type}),
        options:any = new RequestOptions({ headers: headers }),
        url:any = URL_VIRTSERVER + "actualizarPuntos.php";

    this.http.post(url, body, options)
        .subscribe(data =>
          {

            if(data.status === 200){
              this.hideForm   = true;
              if(data["_body"] == 'err 1'){
                this.alertCtrl.create({
                  title: 'Puntos insuficientes',
                  subTitle: 'El usuario no tiene suficientes puntos para que se realice la transacción.',
                  buttons:[
                           {
                             text: 'OK',
                             handler: data => {
                               this.cantidad = null;
                             }
                           }
                         ]
                }).present();
              }else if(data["_body"] == 'err 2'){
                this.alertCtrl.create({
                  title: 'Operación fallida',
                  subTitle: 'El usuario aún no ha sido registrado en la base de datos.',
                  buttons:[
                           {
                             text: 'OK',
                             handler: data => {
                               this.cantidad = null;
                             }
                           }
                         ]
                }).present();
              }else{
                this.alerta = "¡transacción completada con éxito!";
                this.crear_toast();
              }
            }else{
             console.log("Error");
            }
         });
  }

  salir(){
    this._np.logOut();
    this.navCtrl.setRoot(HomePage);
  }

}
