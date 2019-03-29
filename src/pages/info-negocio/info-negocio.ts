import { Component, ChangeDetectorRef, ViewChild, Renderer2 } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, Content, Slides } from 'ionic-angular';

import { CallNumber } from '@ionic-native/call-number';

import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions } from '@ionic-native/google-maps';

import {MapaPage} from '../index.paginas';
import { ColorThiefProvider } from "../../providers/color-thief/color-thief";
import { EstadisticasProvider } from "../../providers/estadisticas/estadisticas";
import { UsuarioProvider } from "../../providers/usuario/usuario";
import { SlideProvider } from "../../providers/slide/slide";
import { NegocioProvider } from "../../providers/negocio/negocio";

@Component({
  selector: 'page-info-negocio',
  templateUrl: 'info-negocio.html',
})
export class InfoNegocioPage {
  @ViewChild(Slides) slides: Slides;
  @ViewChild(Content) content: Content;
  showToolbar:boolean = false;
  headerImgSize:string = '100%';
  transition:boolean = false;

  informacion:any = {};
  map: GoogleMap;

  latitud:number;
  longitud:number;

  paginaMapa:any = MapaPage;

  image:string;
  colorMap:any;

  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 2;

  id_usuario:number;
  id_negocio:number;
  like:number = 0;

  visitas:number = 1;
  tipo:number = 1;
  meGusta:number;
  // statusLike:number;

  constructor(private _sp: SlideProvider, public renderer: Renderer2, public colorThief: ColorThiefProvider, public navCtrl: NavController, public navParams: NavParams, private platform:Platform, private callNumber: CallNumber, public alertCtrl: AlertController, public ref: ChangeDetectorRef, private _up: UsuarioProvider, private _ep: EstadisticasProvider) {

    this.informacion = this.navParams.get("infonegocio");
    // console.log(this.informacion)
    this.image = "http://innovathing.com.mx/VirtPointserver/imgs/" + this.informacion.img;

    this.latitud = Number(this.informacion.lat);
    this.longitud = Number(this.informacion.lng);

    this.id_usuario = Number(this._up.id_usuario);
    this.id_negocio = Number(this.informacion.id);

    this._ep.likeVerify(this.id_usuario, this.id_negocio);
    this._ep.likesAdm(this.id_negocio);

    // this.statusLike = this._ep.yesLike;

    this._sp.cargar_anuncios();
    this.lottieConfig = {
        path: 'assets/like.json',
        autoplay: false,
        loop: false,
        autoloadSegments: false
    };
  }

  ionViewDidEnter(){
    this.meGusta = this._ep.totalLikes;
    if(this._ep.yesLike == 1){
      // console.log("si entro")
      this.stop();
    }
    this.loadMap();
    // document.getElementsByClassName('show-background');
    // console.log(document.getElementsByClassName('toolbar-background'))
    // this.colorBar();
    this._ep.contadorVisitas(this.id_negocio, this.visitas, this.tipo);
  }

  slideChanged(){
    // let currentIndex = this.slides.getActiveIndex();
    this.slides.autoplayDisableOnInteraction = false;
    // console.log('Current index is', currentIndex);
  }

  oneLike(){
    if(this._ep.yesLike == 0){
      this.play();
      this.like = 1;
      this._ep.yesLike = 1;
      this.meGusta += 1;
    }else{
      this.pause();
      this.like = 0;
      this._ep.yesLike = 0;
      this.meGusta -= 1;
    }
    this._ep.recomiendaNegocio(this.id_usuario, this.id_negocio, this.like);
    // this._ep.likeVerify(this.id_usuario, this.id_negocio);
    // console.log("yesLike", this._ep.yesLike)
  }

  handleAnimation(anim: any) {
      this.anim = anim;
      // console.log(anim)
  }

  stop() {
      this.anim.setSpeed(3);
      this.anim.playSegments([[23, 24]], true)
      // console.log(this.anim)
  }

  play() {
      this.anim.setSpeed(this.animationSpeed);
      // this.anim.play();
      this.anim.playSegments([[1, 24]], true);
      // console.log(this.anim)
  }

  pause() {
      this.anim.setSpeed(this.animationSpeed);
      // this.anim.pause();
      this.anim.playSegments([[24, 1]], true);
      // console.log(this.anim)
  }

  visitaWeb(){
    // console.log("se abrirá la página web del negocio ", this.informacion.pagina_web)
    window.open("http://"+this.informacion.pagina_web,'_system', 'location=yes');
  }

  onScroll($event: any){
    // var el = document.getElementById('ben-header');
    // var al = document.getElementsByClassName('toolbar-title');
    // console.log(al)
    let windowHeight = window.innerHeight;
    // console.log(windowHeight)
    // console.log($event.scrollTop)
    let scrollPosition = $event.scrollTop - windowHeight/15;
    // console.log(scrollPosition)
    var alpha = scrollPosition / windowHeight * 6;
    // console.log(alpha)
    let cont = 96 + ($event.scrollTop/1.97484276);
    // console.log("LOKO" + cont)
        // this.renderer.setStyle(document.getElementsByClassName('toolbar-background')[3], 'background-color', "rgba(" + this.colorMap[0] + "," + this.colorMap[1] + "," + this.colorMap[2] + "," + alpha +")");
        this.renderer.setStyle(document.getElementsByClassName('toolbar-title')[3], 'color', "rgba(255,255,255," + alpha +")");
        this.renderer.setStyle(document.getElementsByClassName('back-button-icon')[3], 'color', "rgb(" + cont + "," + cont + "," + cont + ")");
  }

  colorBar(){
    this.colorThief
      .getColorFromUrl(this.image)
      .then((res: { dominantColor: number[]; imageUrl: string }) => {
        this.colorMap = res.dominantColor;
        // console.log(colorMap)
        // this.renderer.setStyle(document.getElementsByClassName('toolbar-background')[3], 'background-color', `rgb(${colorMap[0]},${colorMap[1]},${colorMap[2]})`);
      });
  }

  llamar(numero){
    if(this.platform.is("cordova")){
        // Dispositivo
        console.log("estamos en un celular");
        this.callNumber.callNumber(numero, true)
             .then(() => console.log('Launched dialer!'))
             .catch(() => console.log('Error launching dialer'));
      }else{
       //computadora
       console.log("estamos en una computadora");
       console.log(numero);
      }
  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.latitud,
          lng: this.longitud
        },
        zoom: 16,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');
        // Now you can use all methods safely.
        this.map.addMarker({
            title: this.informacion.negocio,
            icon: 'red',
            animation: 'DROP',
            position: {
              lat: this.latitud,
              lng: this.longitud
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                this.alerta();
              });
          });
      });
  }


  alerta(){

    this.alertCtrl.create({
          title: this.informacion.negocio,
          subTitle: this.informacion.horario,
          buttons: ["Ok"]
    }).present();
    return;
  }

}
