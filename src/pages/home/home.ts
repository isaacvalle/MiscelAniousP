import { Component } from '@angular/core';
import { NavController, Platform, Keyboard,MenuController } from 'ionic-angular';

import {UsuarioProvider} from '../../providers/index.providers';

import {RegistroPage, TabsPage, LoginNegocioPage, CambiarPassPage} from '../index.paginas';

import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  correo:string = "";
  contrasena:string = "";
  paginaRegistro:any = RegistroPage;
  paginaloginNegocio:any = LoginNegocioPage;
  paginaCambiarpass:any = CambiarPassPage;

  applyClass:boolean;

  constructor(public menuCtrl: MenuController, public keyboard: Keyboard, public navCtrl: NavController, private _up:UsuarioProvider, private platform: Platform, private screenOrientation: ScreenOrientation) {

  }

  ionViewWillEnter(){
    this.bloquearRotacion();
    if(this.keyboard.isOpen()){
      this.applyClass = true;
    };
    this.menuCtrl.swipeEnable(false);
  }

  bloquearRotacion(){
    if(this.platform.is("cordova")){
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
  }

  ingresar(){
    this._up.ingresar(this.correo, this.contrasena).subscribe(()=>{
      if(this._up.activo()){
          this.navCtrl.setRoot(TabsPage);
      }
    })
  }

  ngAfterViewInit(){
    let tabs = document.querySelectorAll('.show-tabbar');
    if(tabs !== null){
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'none';
      })
    }
  }

}
