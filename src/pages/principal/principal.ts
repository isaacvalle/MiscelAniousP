import { NavController, NavParams, Platform, Slides, MenuController } from 'ionic-angular';
import {UsuarioProvider, SlideProvider, NegocioProvider, CatalogoProvider} from '../../providers/index.providers';
import { URL_VIRTSERVER } from "../../config/url.servicios";

//charts
import { Component,  ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

import {HomePage, InfoNegocioPage} from '../index.paginas';

import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {
  @ViewChild(Slides) slides: Slides;
  //ViewChild es necesario para el chart
  @ViewChild('doughnutCanvas') doughnutCanvas;

  //variables para el chart
  puntosDoughnut:number[] = [];
  nombresDoughnut:string[] = [];
  colorDoughnut:string[] = [];
  //variable para almacenar los datos
  items:any = [];
  //variable para poner el total de puntos en el chart
  centroSuma:number;

  banBuscar:number = 1;

  paginaInfoNegocio:any = InfoNegocioPage;

  estado:string;
  municipio:string;

  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 3;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private platform: Platform,
              private _up: UsuarioProvider,
              private _sp: SlideProvider,
              private _np: NegocioProvider,
              private screenOrientation: ScreenOrientation,
              private _cp:CatalogoProvider,
              public menuCtrl: MenuController) {


                this._sp.cargar_anuncios();
                this.lottieConfig = {
                    path: 'assets/search.json',
                    autoplay: false,
                    loop: false,
                    autoloadSegments: false
                };
  }


  bloquearRotacion(){
    if(this.platform.is("cordova")){
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
  }

  handleAnimation(anim: any) {
      this.anim = anim;
      // console.log(anim)
  }

  stop() {
      this.anim.stop();
      // console.log(this.anim)
  }

  play() {
      this.anim.setSpeed(this.animationSpeed);
      // this.anim.play();
      this.anim.playSegments([[15, 90]], true);
      // console.log(this.anim)
  }

  pause() {
      this.anim.setSpeed(this.animationSpeed);
      // this.anim.pause();
      this.anim.playSegments([[120, 179]], true);
      // console.log(this.anim)
  }

  datosChart(valores){
    this.items = JSON.parse(valores);
    console.log(this.items)

    let categorias = [];
    let puntos = [];
    let colores = [];

    //ciclo que asigna valores a los arreglos del chart
    for (let item of this.items) {
      categorias.push(item.catalogo);
      puntos.push(Number(item.puntos));
      colores.push(item.color);
    };

    //ciclo en el cual se obtienen los 8 valores más altos y de acuerdo a su indice se extraen sus valores relacionados
    //CAMBIA EL VALOR DE COMPARACION DE ACUERDO AL NUMERO DE ELEMENTOS QUE QUIERAS EN EL CHART
    for(var i=0; i<2; i++){
      // buscamos el vamor mas grande
      let max=Math.max.apply(null, puntos);

      // buscamos el idice del valor en el array
      var index = puntos.indexOf(max);

      // guardamos dicho valor en un nuevo array
      this.puntosDoughnut.push(max);
      this.nombresDoughnut.push(categorias[index]);
      this.colorDoughnut.push(colores[index]);

      // eliminamos dicho valor del array original
      puntos.splice(index, 1);
      categorias.splice(index, 1);
      colores.splice(index, 1);
    };

    //ciclo que hace la suma del total de puntos de las categoías
    let suma = 0;
    for (let i = 0; i < this.items.length; i++) {
      suma += Number(this.items[i]["puntos"]);
    }

    this.centroSuma = suma;
    //console.log(this.centroSuma);
  }

  ionViewWillEnter() {
    this._sp.anuncios = [];
    this._sp.cargar_anuncios();
    this.cargarGet(Number(this._up.id_usuario));
    this.bloquearRotacion();
  }

  slideChanged(){
    // let currentIndex = this.slides.getActiveIndex();
    this.slides.autoplayDisableOnInteraction = false;
    // console.log('Current index is', currentIndex);
  }

  menuActive(){
    this.menuCtrl.enable(true, 'users');
    this.menuCtrl.enable(false, 'admin');
  }

  //en esta función se define el chart
  ionViewDidEnter(){
    this.crear_grafica();
  }

  ionViewWillLeave(){
    this.puntosDoughnut = [];
    this.nombresDoughnut = [];
    this.colorDoughnut = [];
    //variable para almacenar los datos
    this.items = [];
    //variable para poner el total de puntos en el chart
    this.centroSuma = null;
    // this.stop();
  }

  crear_grafica(){

    let doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
        type: 'doughnut',
        data: {
            labels: this.nombresDoughnut,
            datasets: [{
                data: this.puntosDoughnut,
                backgroundColor: this.colorDoughnut,
                hoverBackgroundColor: this.colorDoughnut,
                borderColor: '#f6f6f6',

            }]
        },
        options: {
          events: ["click", "touchstart", "touchend"],
          legend: {
            display: false
          },
          tooltips: {
            enabled: false
          },
          cutoutPercentage: 85,
          elements: {
            center: {
              text: this.centroSuma + " Puntos",
              color: '#626262', //Default black
              fontStyle: 'Montserrat', //Default Arial
              sidePadding: 15 //Default 20 (as a percentage)
            }
          }
        },
    });
  //
  //   //plugin para el texto en el centro del doughnut chart
    Chart.pluginService.register({
      beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
          //Get ctx from string
          var ctx = chart.chart.ctx;

          //Get options from the center object in options
          var centerConfig = chart.config.options.elements.center;
          var fontStyle = centerConfig.fontStyle || 'Arial';
          var txt = centerConfig.text;
          var color = centerConfig.color || '#000';
          var sidePadding = centerConfig.sidePadding || 20;
          var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
          //Start with a base font of 30px
          ctx.font = "37px " + fontStyle;

          //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          var stringWidth = ctx.measureText(txt).width;
          var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

          // Find out how much the font can grow in width.
          var widthRatio = elementWidth / stringWidth;
          var newFontSize = Math.floor(30 * widthRatio);
          var elementHeight = (chart.innerRadius * 2);

          // Pick a new font size so it will not be larger than the height of label.
          var fontSizeToUse = Math.min(newFontSize, elementHeight);

          //Set font settings to draw it correctly.
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
          var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
          ctx.font = fontSizeToUse+"px " + fontStyle;
          ctx.fillStyle = color;
          //Draw text in center
          ctx.fillText(txt, centerX, centerY);
        }
      }
    });

    //función para que se muestren las categorías dinámicamente dentro del chart
    document.getElementById('myChart').addEventListener('click', handler, false);
    document.getElementById('myChart').addEventListener('touchstart', handler, false);
    document.getElementById('myChart').addEventListener('touchend', handler, false);
    let inicio:any = doughnutChart.config.options.elements.center.text;
    // let cad:any = this.centroSuma + " PuntosTotales";
    // console.log(cad)

    function handler(evt){
      //console.log(evt.type)
      switch(evt.type){
        case 'touchstart':
          var activePoints = doughnutChart.getElementsAtEvent(evt);
          if(activePoints.length > 0){
            //get the internal index of slice in pie chart
            var clickedElementindex = activePoints[0]["_index"];
            //get specific label by index
            var label = doughnutChart.data.labels[clickedElementindex];
            //get value by index
            var value = doughnutChart.data.datasets[0].data[clickedElementindex];
            /* other stuff that requires slice's label and value */
            var datos = label + ": " + value;
            doughnutChart.config.options.elements.center.text = datos;
            //console.log(doughnutChart.config.options.elements.center.text);
          }
          break;

        case 'touchend':
          doughnutChart.config.options.elements.center.text = inicio;
          break;

        case 'click':
          doughnutChart.config.options.elements.center.text = inicio;
          break;
      }
    }
  }

  //función que hace la consulta síncrona de los datos para que el chart funcione
  cargarGet(id_usuario:number){
  		    // let xmlHttp = new XMLHttpRequest();
  		    // xmlHttp.open( "GET", URL_SERVICIOS, false ); // false for synchronous request
  		    // xmlHttp.send();
  		    // return xmlHttp.responseText;

          var xhr = new XMLHttpRequest();
          xhr.open("POST", URL_VIRTSERVER + "grafica.php", false);
          xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhr.send("&id_usuario=" + id_usuario);
          this.datosChart(xhr.responseText);
  }

  salir(){
    this._up.logOut();
    this.nombresDoughnut = [];
    this.puntosDoughnut = [];
    this.colorDoughnut = [];

    this.navCtrl.setRoot(HomePage);
  }

  recargar_pagina(refresher:any) {

    setTimeout(() => {

      this.puntosDoughnut = [];
      this.nombresDoughnut = [];
      this.colorDoughnut = [];
      //variable para almacenar los datos
      this.items = [];
      //variable para poner el total de puntos en el chart
      this.centroSuma = null;
      this.cargarGet(Number(this._up.id_usuario));

      this.ionViewDidEnter();

      refresher.complete();
    }, 2000);
  }

  btnBuscar(){
    this.banBuscar++;
    if(this.banBuscar%2 == 0){
      this.play();
    }else if(this.banBuscar%2 != 0){
      this.pause();
    }
  }

  buscar_negocios(ev: any){
    console.log(ev)
    let valor = ev.target.value;
    if(valor != ""){
      this._np.buscar_negocio(valor);
    }
  }

  guardarEstado(){
    this._up.estado = this.estado;
    this._up.municipio = 'vacio';
    this.municipio = "vacio";
    this._up.guardar_storage();
    this._cp.cargar_municipiosporestado(this._up.estado);
  }

  guardarMunicipio(){
    this._up.municipio = this.municipio;
    this._up.guardar_storage();
  }

}
