import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import {UsuarioProvider} from '../../providers/index.providers';

import {RegistroPage, TabsPage} from '../index.paginas';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuario:string = "";
  contrasena:string = "";

  paginaRegistro:any = RegistroPage;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private _up:UsuarioProvider) {

  }

  ingresar(){

    //VALIDACION DE INGRESAR DATOS EN LA APLICACION
    /*if(this.usuario == "" || this.contrasena == ""){

      this.alertCtrl.create({
            title:"ERROR!",
            subTitle: "No has ingresado tus datos",
            buttons: ["Ok"]
      }).present();

      return;

    }*/

    //this._up.ingresar(this.usuario, this.contrasena);


    this._up.ingresar(this.usuario, this.contrasena).subscribe(()=>{
      if(this._up.activo()){


          this.navCtrl.setRoot(TabsPage);
        //this.modalCtrl.create(TabsPage).present();

      }
    })

  }

}
