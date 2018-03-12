import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import {HomePage, RegistroPage, PrincipalPage, TabsPage, CatalogoPage, MisaldoPage, CompartirPage, CuentaPage } from '../pages/index.paginas';
import { UsuarioProvider } from '../providers/usuario/usuario';

import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegistroPage,
    PrincipalPage,
    TabsPage,
    CatalogoPage,
    MisaldoPage,
    CompartirPage,
    CuentaPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegistroPage,
    PrincipalPage,
    TabsPage,
    CatalogoPage,
    MisaldoPage,
    CompartirPage,
    CuentaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UsuarioProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
