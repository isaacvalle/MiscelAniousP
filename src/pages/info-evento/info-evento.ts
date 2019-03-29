import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController, Slides } from 'ionic-angular';

import { DetalleEventoPage } from "../index.paginas";
import { EventosProvider } from "../../providers/eventos/eventos";
import { GhostProvider } from "../../providers/ghost/ghost";
import { UsuarioProvider } from "../../providers/usuario/usuario";
import { CatalogoProvider } from "../../providers/catalogo/catalogo";

@Component({
  selector: 'page-info-evento',
  templateUrl: 'info-evento.html',
})
export class InfoEventoPage {
  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides;

  detalleEvento:any = DetalleEventoPage;

  SwipedTabsIndicator :any= null;
  tabs:any=[];

  isPressed:boolean = false;
  allCate:any = [];
  cont:number = 0;
  markPressed:boolean = false;
  estado:string;
  municipio:string = "";

  cheker:number;

  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1.2;

  diaName:any [] = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
  mesNames: any[] = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public menuCtrl: MenuController,
              private _evp: EventosProvider,
              private _ghotsPrv: GhostProvider,
              private _up: UsuarioProvider,
              private _cp:CatalogoProvider) {
    this.tabs=["Todos","Hoy"];
    this.lottieConfig = {
        path: 'assets/search_ask_loop.json',
        autoplay: false,
        loop: false,
        autoloadSegments: false
    };
  }

  handleAnimation(anim: any) {
    this.anim = anim;
    // console.log(anim)
  }

  play() {
    this.anim.setSpeed(this.animationSpeed);
    // this.anim.play();
    this.anim.playSegments([[1,23]], true);
    // console.log(this.anim)
  }

  ionViewDidLoad() {
    this.estado = this._up.estado;
    this._evp.evtsGenerales(0, this.estado, this.municipio);
    this._evp.evtCategorias();
    this._evp.evtsHoy(this.estado, this.municipio);
    this._cp.cargar_municipiosporestado(this.estado);
    console.log(this.fechaPreview("2018-09-18"));
  }

  fechaPreview(fecha) {
    //let fecha = "2018-05-03";
    let format = fecha;
    let forIos = format.replace(/-/g, "/");

    let nuevaFecha = new Date(forIos + " ");
    let diaSemana = nuevaFecha.getDay();
    let anio = nuevaFecha.getFullYear();
    let dia = nuevaFecha.getDate();
    let mes = nuevaFecha.getMonth();
    let fecha_convertida = {  diaSema: this.diaName[diaSemana],
      anio: anio,
      dia: dia,
      mes: this.mesNames[mes]
    };
    // this.diaName[diaSemana] + " " + dia + " de " + this.mesNames[mes] + " de " + anio;
    return fecha_convertida;
  }

  ionViewDidEnter() {
    this.SwipedTabsIndicator = document.getElementById("indicator");

    this._setLoaded();
    // this.reload();
  }

  handleChip(item, i){
    // console.log("index: ", i)
    // console.log("id: ", item.id)
    this.isPressed = true;
    this.cont += 1;
    // console.log(this.cont)
    if(this.isPressed && this.cont < 2){
      this._evp.evtsGenerales(item.id, this.estado, this.municipio);
      this._evp.check(item.id, this.estado, this.municipio).subscribe((data:any) => {
        if(data.length == 0)
        this.play();
      })
      this.allCate = this._evp.categorias;
      // console.log("seleccionaste el chip: ", item.nombre)
      this._evp.categorias = this.allCate.slice(i, i+1);
      this.refresh();
    }
  }

  delete() {
    this._evp.evtsGenerales(0, this.estado, this.municipio);
    this.isPressed = false;
    this._evp.categorias = this.allCate;
    this.cont = 0;
    this.refresh();
  }

  setLocation(){
    this.markPressed = !this.markPressed;
  }

  guardarEstado(){
    // console.log(this.estado)
    this.municipio = "";
    this._cp.cargar_municipiosporestado(this.estado);
    this._evp.evtsGenerales(0, this.estado, this.municipio);
    this._evp.evtsHoy(this.estado, this.municipio);
    this.refresh();
    if(this.isPressed)
    this.delete();
  }

  guardarMunicipio(){
    // console.log(this.municipio)
    this._evp.evtsGenerales(0, this.estado, this.municipio);
    this._evp.evtsHoy(this.estado, this.municipio);
    this.refresh();
    this.markPressed = false;
    if(this.isPressed)
    this.delete();
  }

  //////////////////// LAS SIGUIENTES 4 FUNCIONES SON PARA EL SLIDE Y SEGMENT
  menuActive(){
    this.menuCtrl.enable(true, 'users');
    this.menuCtrl.enable(false, 'admin');
  }

  selectTab(index) {
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(100*index)+'%,0,0)';
    this.SwipedTabsSlider.slideTo(index, 500);
  }

  updateIndicatorPosition() {
      // this condition is to avoid passing to incorrect index
  	if( this.SwipedTabsSlider.length()> this.SwipedTabsSlider.getActiveIndex())
  	{
  		this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(this.SwipedTabsSlider.getActiveIndex() * 100)+'%,0,0)';
  	}

  }

  animateIndicator($event) {
  	if(this.SwipedTabsIndicator){
   	    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (($event.progress* (this.SwipedTabsSlider.length()-1))*100) + '%,0,0)';
        // let estoy = this.SwipedTabsSlider.getActiveIndex();
        // console.log(estoy)
    }
  }

  //////////////////// LAS SIGUIENTES 3 FUNCIONES SON PARA EL GHOST LOADING
  refresh() {
    this._setLoaded();
    this.reload();
  }
  reload() {
    this._ghotsPrv.setLoading(true);
    // this._setLoaded();
  }

  private _setLoaded() {
    setTimeout(() => {
      this._ghotsPrv.setLoading(false);
    }, 1000);
  }

}
