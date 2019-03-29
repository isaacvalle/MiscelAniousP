import { Component } from '@angular/core';
import { NavController, NavParams, Platform, MenuController } from 'ionic-angular';

import {UsuarioProvider} from '../../providers/index.providers';

import { AlertController } from 'ionic-angular';

import {HomePage} from '../index.paginas';

import { Vibration } from '@ionic-native/vibration';


@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  nombre:string = "";
  email:string = "";
  usuario:string = "";
  telefono:string = "";
  estado:string = "";
  municipio:string = "";
  codigo:string = "";
  contrasena:string = "";
  confcontrasena:string = "";




  constructor(public menuCtrl:MenuController, public navCtrl: NavController, public navParams: NavParams, private _up:UsuarioProvider, public alertCtrl: AlertController, private platform:Platform, private vibration: Vibration) {

  }

  ionViewDidLoad(){
    this.menuCtrl.swipeEnable(false);
  }
  registrar(){

    if(this.nombre == "" || this.email == "" || this.usuario == "" || this.telefono == "" || this.contrasena == "" || this.confcontrasena == "" || this.estado == "" || this.municipio == ""){

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

      this.validar(this.nombre);
    }

  }

  validar(nombre){
    let exprecion = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/;

    if(!exprecion.test(nombre)){

      if(this.platform.is("cordova")){
        this.vibration.vibrate(500);
      }

      this.alertCtrl.create({
            title:"Caracteres no validos!",
            subTitle: "Solo se permiten letras en el campo de Nombre",
            buttons: ["Ok"]
      }).present();

      return;
    }else{
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
      this.validarUsario(this.usuario);
    }

  }

  validarUsario(usuario){
    let exprecion = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9 ]*$/;

    if(!exprecion.test(usuario)){

      if(this.platform.is("cordova")){
        this.vibration.vibrate(500);
      }

      this.alertCtrl.create({
            title:"Caracteres no validos!",
            subTitle: "Solo se permiten letras y números en el campo de Usuario",
            buttons: ["Ok"]
      }).present();

      return;
    }else{
      this.validarTelefono(this.telefono);
    }

  }

  validarTelefono(telefono){
    let exprecion = /^[0-9 ]*$/;

    if(!exprecion.test(telefono)){

      if(this.platform.is("cordova")){
        this.vibration.vibrate(500);
      }

      this.alertCtrl.create({
            title:"Caracteres no validos!",
            subTitle: "Solo se permiten números en el campo de Teléfono",
            buttons: ["Ok"]
      }).present();

      return;
    }else{
      this.validarEstado(this.estado);
    }
  }

  validarEstado(estado){
    let exprecion = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/;

    if(!exprecion.test(estado)){

      if(this.platform.is("cordova")){
        this.vibration.vibrate(500);
      }

      this.alertCtrl.create({
            title:"Caracteres no validos!",
            subTitle: "Solo se permiten letras en el campo de Estado",
            buttons: ["Ok"]
      }).present();

      return;
    }else{
      this.validarMunicipio(this.municipio);
    }
  }

  validarMunicipio(municipio){
    let exprecion = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/;

    if(!exprecion.test(municipio)){

      if(this.platform.is("cordova")){
        this.vibration.vibrate(500);
      }

      this.alertCtrl.create({
            title:"Caracteres no validos!",
            subTitle: "Solo se permiten letras en el campo de Municipio",
            buttons: ["Ok"]
      }).present();

      return;
    }else{
      this.validarCodigo(this.codigo);
    }
  }

  validarCodigo(codigo){
    let exprecion = /^[a-z0-9]*$/;

    if(!exprecion.test(codigo)){

      if(this.platform.is("cordova")){
        this.vibration.vibrate(500);
      }

      this.alertCtrl.create({
            title:"Caracteres no validos!",
            subTitle: "Solo se permiten letras en minúscula y números en el campo de Código",
            buttons: ["Ok"]
      }).present();

      return;
    }else{
      this._up.registrar(this.nombre, this.email, this.usuario, this.contrasena, this.telefono, this.estado, this.municipio, this.codigo);
      this.navCtrl.push(HomePage);

    }
  }

}
