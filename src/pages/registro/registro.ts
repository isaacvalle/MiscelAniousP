import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {UsuarioProvider} from '../../providers/index.providers';

import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  nombre:string = "";
  email:string = "";
  usuario:string = "";
  contrasena:string = "";
  confcontrasena:string = "";

  caracteres = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/;






  constructor(public navCtrl: NavController, public navParams: NavParams, private _up:UsuarioProvider, public alertCtrl: AlertController) {

  }




  registrar(){

    let nombre = this.nombre;

    this.validarNombre(nombre);

    if(this.nombre == "" || this.email == "" || this.usuario == "" || this.contrasena == "" || this.confcontrasena == ""){

      this.alertCtrl.create({
            title:"Oops!",
            subTitle: "No has llenado todos los campos",
            buttons: ["Ok"]
      }).present();

      return;

    }


    if(this.contrasena != this.confcontrasena){
      this.alertCtrl.create({
            title:"Error!",
            subTitle: "Las contraseñas no son iguales",
            buttons: ["Ok"]
      }).present();

      return;

    }else{

      this._up.registrar(this.nombre, this.email, this.usuario, this.contrasena);

    }


  }

  validarNombre(nombre){
    let exprecion = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/;

    if(!exprecion.test(nombre)){
      this.alertCtrl.create({
            title:"Caracteres no validos!",
            subTitle: "Solo se permiten letras en el campo de Nombre",
            buttons: ["Ok"]
      }).present();

      return;
    }
  }




}
