import {Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';

import { Platform, LoadingController, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {URL_SERVINEGOCIOS} from '../../config/url.servicios';

import {URL_VIRTSERVER} from '../../config/url.servicios';

import {Storage} from '@ionic/storage';

import { Vibration } from '@ionic-native/vibration';



@Injectable()
export class NegocioProvider {

  token:string;
  id_negocio:string;
  id_categoria:string;
  negocio:string;
  imagen:string;

  resultado:any = [];

  ruta:string;


  constructor(public http: Http, private platform:Platform, private storage: Storage, private loadingCtrl: LoadingController, public alertCtrl: AlertController, private vibration: Vibration) {
    this.cargar_storage();

  }

  activo():boolean{
    if(this.token){
      return true;
    }else{
      return false;
    }
  }

  ingresar(usuario:string, contrasena:string){

      let data = new URLSearchParams();
      data.append("username", usuario);
      data.append("contrasena", contrasena);

      let url = URL_SERVINEGOCIOS +"/login";

      return this.http.post(url, data).map(resp=>{
        let data_rest = resp.json();

        if(data_rest.error){

          if(this.platform.is("cordova")){
            this.vibration.vibrate(1000);
          }

          this.alertCtrl.create({
            title:"Error al iniciar",
            subTitle: data_rest.mensaje,
            buttons: ["Ok"]
          }).present();

        }
        else{

          this.token = data_rest.token;
          this.id_categoria = data_rest.id_categoria;
          this.id_negocio = data_rest.id_negocio;
          this.negocio = data_rest.negocio;
          this.imagen = data_rest.imagen;

          //Guardar storage
          this.guardar_storage();
          this.mostrar_loading();

        }
      });
  }


  private guardar_storage(){
      if(this.platform.is("cordova")){
        //Estamos en el dispositivo
        this.storage.set('token', this.token);
        this.storage.set('id_categoria', this.id_categoria);
        this.storage.set('id_negocio', this.id_negocio);
        this.storage.set('negocio', this.negocio);
        this.storage.set('imagen', this.imagen);
      }
      else{
        //Estamos en la computadora
        if(this.token){
            localStorage.setItem("token", this.token);
            localStorage.setItem("id_categoria", this.id_categoria);
            localStorage.setItem("id_negocio", this.id_negocio);
            localStorage.setItem("negocio", this.negocio);
            localStorage.setItem("imagen", this.imagen);

        }else{
          localStorage.removeItem("token");
          localStorage.removeItem("id_categoria");
          localStorage.removeItem("id_negocio");
          localStorage.removeItem("negocio");
          localStorage.removeItem("imagen");

        }
      }
    }

    cargar_storage(){
      let promesa = new Promise((resolve, reject)=>{
        if(this.platform.is("cordova")){
          //Estamos en el dispositivo
          this.storage.ready().then(()=>{
              this.storage.get("token").then(token=>{
                if(token){
                  this.token = token;
                }
              })

              this.storage.get("id_categoria").then(id_categoria=>{
                if(id_categoria){
                  this.id_categoria = id_categoria;
                }
              })

              this.storage.get("id_negocio").then(id_negocio=>{
                if(id_negocio){
                  this.id_negocio = id_negocio;
                }
              })

              this.storage.get("negocio").then(negocio=>{
                if(negocio){
                  this.negocio = negocio;
                }
                resolve();
              })

              this.storage.get("imagen").then(imagen=>{
                if(imagen){
                  this.imagen = imagen;
                }
                resolve();
              })
        })

        }else{
          //Estamos en la computadora
          if(localStorage.getItem("token")){
            //Exite items en el localstorage
            this.token = localStorage.getItem("token");
            this.id_categoria = localStorage.getItem("id_categoria");
            this.id_negocio = localStorage.getItem("id_negocio");
            this.negocio = localStorage.getItem("negocio");
            this.imagen = localStorage.getItem("imagen");
          }
          resolve();
        }
      });
      return promesa;
    }


    mostrar_loading(){
      let loader = this.loadingCtrl.create({
        content: "Cargando...",
        spinner: "crescent",
        duration: 2000
      });
      loader.present();
    }

    buscar_negocio(termino:string){

      let body       : string = "&termino=" + termino,
          type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
          headers    : any     = new Headers({ 'Content-Type': type}),
          options    : any     = new RequestOptions({ headers: headers }),
          url        : any     = URL_VIRTSERVER + "buscar.php";

      this.http.post(url, body, options).map(res => res.json())
      .subscribe(data =>
      {
        this.resultado = data;

      });
    }

    logOut(){
      this.token = null;
      this.id_negocio = null;
      this.id_categoria = null;
      this.negocio = null;

      this.guardar_storage();
    }



    directionsServer(origin, destination){

      let body       : string = "&origin=" + origin + "&destination=" + destination,
          type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
          headers    : any     = new Headers({ 'Content-Type': type}),
          options    : any     = new RequestOptions({ headers: headers }),
          url        : any     = URL_VIRTSERVER + "directions.php";

      this.http.post(url, body, options).map(res => res.json())
      .subscribe(data =>
      {
        this.ruta = data;
        console.log(data);
        //console.log(this.pntsUsuarioNegocio);


      });

    }

}
