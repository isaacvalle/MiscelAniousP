import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {UsuarioProvider} from '../providers/index.providers';


import {HomePage, TabsPage} from '../pages/index.paginas';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private _up:UsuarioProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this._up.cargar_storage().then(()=>{
        //console.log(this._up.token);
         if(this._up.token){

           this._up.mostrar_loading();
           this.rootPage = TabsPage;
         }else{
           this.rootPage = HomePage;
         }

         statusBar.styleDefault();
         splashScreen.hide();


      })

    });
  }
}
