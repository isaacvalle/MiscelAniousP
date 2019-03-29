import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';

import { MyApp } from './app.component';

import {HomePage, RegistroPage, PrincipalPage, TabsPage, CatalogoPage, MisaldoPage, CompartirPage, CuentaPage, PorCategoriaPage, InfoNegocioPage, LoginNegocioPage, HomeNegocioPage, CuentaPuntosPage, CambiarPassPage, MapaPage, PanelNegocioPage, InfoEventoPage, DetalleEventoPage} from '../pages/index.paginas';

import { GoogleMaps } from '@ionic-native/google-maps';

import { UsuarioProvider } from '../providers/usuario/usuario';
import { CatalogoProvider } from '../providers/catalogo/catalogo';
import { PuntosProvider } from '../providers/puntos/puntos';
import { SlideProvider } from '../providers/slide/slide';
import { NegocioProvider } from '../providers/negocio/negocio';
import { HistorialProvider } from '../providers/historial/historial';

import {ImagenPipe} from '../pipes/imagen/imagen';

import { IonicStorageModule } from '@ionic/storage';

import { CallNumber } from '@ionic-native/call-number';

import {NgxQRCodeModule} from 'ngx-qrcode2';

//CHART
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { Vibration } from '@ionic-native/vibration';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { SocialSharing } from '@ionic-native/social-sharing';

import { AppRate } from '@ionic-native/app-rate';

import { ElasticHeaderModule } from "ionic2-elastic-header/dist";
import { ColorThiefProvider } from '../providers/color-thief/color-thief';
import { LottieAnimationViewModule } from 'lottie-angular2';
import { EstadisticasProvider } from '../providers/estadisticas/estadisticas';
import { Camera } from '@ionic-native/camera';

import { ParallaxHeaderDirective } from '../directives/parallax-header/parallax-header';
import { EventosProvider } from '../providers/eventos/eventos';
import { GhostProvider } from '../providers/ghost/ghost';
import { ComponentsModule } from "../components/components.module";


@NgModule({
  declarations: [
    MyApp,
    ImagenPipe,
    HomePage,
    RegistroPage,
    PrincipalPage,
    TabsPage,
    CatalogoPage,
    MisaldoPage,
    CompartirPage,
    CuentaPage,
    PorCategoriaPage,
    InfoNegocioPage,
    LoginNegocioPage,
    HomeNegocioPage,
    CuentaPuntosPage,
    CambiarPassPage,
    MapaPage,
    PanelNegocioPage,
    InfoEventoPage,
    DetalleEventoPage,
    ParallaxHeaderDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    NgxQRCodeModule,
    ComponentsModule,
    LottieAnimationViewModule.forRoot(),
    IonicModule.forRoot(MyApp,{
      platforms: {
        ios: {
          backButtonText: ''
        }
      }
    }),
    IonicStorageModule.forRoot(),
    ChartsModule,
    ElasticHeaderModule
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
    CuentaPage,
    PorCategoriaPage,
    InfoNegocioPage,
    LoginNegocioPage,
    HomeNegocioPage,
    CuentaPuntosPage,
    CambiarPassPage,
    MapaPage,
    PanelNegocioPage,
    InfoEventoPage,
    DetalleEventoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UsuarioProvider,
    CatalogoProvider,
    CallNumber,
    GoogleMaps,
    HttpModule,
    HttpClient,
    PuntosProvider,
    SlideProvider,
    ScreenOrientation,
    Vibration,
    NegocioProvider,
    HistorialProvider,
    BarcodeScanner,
    SocialSharing,
    AppRate,
    Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ColorThiefProvider,
    EstadisticasProvider,
    Camera,
    EventosProvider,
    GhostProvider


  ]
})
export class AppModule {}
