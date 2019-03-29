import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {UsuarioProvider, NegocioProvider} from '../providers/index.providers';


import {HomePage, TabsPage, HomeNegocioPage, PanelNegocioPage, InfoEventoPage} from '../pages/index.paginas';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any, icon:string}>;
  paginas: Array<{title: string, component: any, icon:string}>;
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private _up:UsuarioProvider, private _np:NegocioProvider) {
    platform.ready().then(() => {
      this.pages = [
        { title: 'Escaner', component: HomeNegocioPage, icon: 'qr-scanner' },
        { title: 'Panel de control', component: PanelNegocioPage, icon: 'stats' }
      ];
      this.paginas = [
        { title: 'MAP', component: TabsPage, icon: 'custom-smile' },
        { title: 'Guía de eventos', component: InfoEventoPage, icon: 'custom-calendar' }
      ];
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.hide();
      this._up.cargar_storage().then(()=>{
        //console.log(this._up.token);
        if(this._up.id_usuario){

        if(this._up.token){

          this._up.mostrar_loading();
          this.rootPage = TabsPage;
        }else{
          this.rootPage = HomePage;
        }

      }else{


        this._np.cargar_storage().then(()=>{

          if(this._np.id_negocio){
            //console.log("id: " + this._np.id_negocio);

            if(this._np.token){

              this._np.mostrar_loading();
              this.rootPage = HomeNegocioPage;
            }else{
              this.rootPage = HomePage;
            }

          }else{
            this.rootPage = HomePage;
          }

        })


      }


         statusBar.styleDefault();
         splashScreen.hide();


      })

    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
